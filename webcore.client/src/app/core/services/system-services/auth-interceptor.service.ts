// auth.interceptor.ts
// Interceptor tự động:
// 1. Chèn Authorization Bearer <token>
// 2. Nếu API trả về 401 → gọi refresh token
// 3. Nếu refresh thành công → retry request gốc
// 4. Nếu thất bại → logout

import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { Observable, catchError, switchMap, throwError, from, EMPTY } from 'rxjs';
import { AuthenticationService } from './authentication.service';


const isRefreshing = signal(false);
const refreshQueue: Array<() => void> = [];

export const authInterceptorService: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthenticationService);

  let modified = req;

  /** Thêm Bearer token nếu có */
  if (auth.accessToken()) {
    modified = req.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.accessToken()}`,
      },
    });
  }

  return next(modified).pipe(
    catchError((error: HttpErrorResponse) => {
      /** Nếu không phải 401 → ném lỗi */
      if (error.status !== 401) {
        return throwError(() => error);
      }

      /** Nếu đang refresh → đưa request vào hàng đợi */
      if (isRefreshing()) {
        return from(
          new Promise<Observable<HttpEvent<unknown>>>((resolve) => {
            refreshQueue.push(() => resolve(next(modified)));
          })
        ).pipe(switchMap(obs => obs));
      }

      /** Bắt đầu refresh */
      isRefreshing.set(true);

      return auth.refresh().pipe(
        switchMap((res) => {
          auth.setToken(res.accessToken);
          isRefreshing.set(false);

          // Chạy lại tất cả request đang chờ
          refreshQueue.forEach((resume) => resume());
          refreshQueue.length = 0;

          // Retry request hiện tại
          const retryReq = modified.clone({
            setHeaders: { Authorization: `Bearer ${res.accessToken}` },
          });
          return next(retryReq);
        }),

        catchError((refreshErr) => {
          isRefreshing.set(false);
          auth.clear();
          refreshQueue.length = 0;
          return throwError(() => refreshErr);
        })
      );
    })
  );
};
