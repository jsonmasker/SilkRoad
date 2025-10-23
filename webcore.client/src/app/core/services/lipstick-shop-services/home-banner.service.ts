import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { HomeBannerViewModel } from '@models/lipstick-shop-models/home-banner.model';
import { Pagination } from '@models/pagination.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeBannerService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
  getAll(pageIndex: number, pageSize: number, bannerTypeId: number): Observable<APIResponse<Pagination<HomeBannerViewModel>>> {
    return this.http.get<APIResponse<Pagination<HomeBannerViewModel>>>(EUrl.getAllUrlHomeBanner + `/${pageIndex}/${pageSize}/${bannerTypeId}`, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<HomeBannerViewModel>>>(EUrl.getAllUrlHomeBanner + `/${pageIndex}/${pageSize}/${bannerTypeId}`, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<HomeBannerViewModel>>> {
    const url = EUrl.getAllDeletedUrlHomeBanner.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<HomeBannerViewModel>>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<HomeBannerViewModel>>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getAllActive(): Observable<APIResponse<HomeBannerViewModel[]>> {
    return this.http.get<APIResponse<HomeBannerViewModel[]>>(EUrl.getAllActiveUrlHomeBanner, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<HomeBannerViewModel[]>>(EUrl.getAllActiveUrlHomeBanner, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getByBannerTypeId(bannerTypeId: number): Observable<APIResponse<HomeBannerViewModel[]>> {
    return this.http.get<APIResponse<HomeBannerViewModel[]>>(EUrl.getByBannerTypeId + `/${bannerTypeId}`, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<HomeBannerViewModel[]>>(EUrl.getByBannerTypeId + `/${bannerTypeId}`, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: any): Observable<APIResponse<HomeBannerViewModel>> {
    return this.http.get<APIResponse<HomeBannerViewModel>>(EUrl.getByIdUrlHomeBanner + `/${id}`, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<HomeBannerViewModel>>(EUrl.getByIdUrlHomeBanner + `/${id}`, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlHomeBanner, model, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(EUrl.createUrlHomeBanner, model, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlHomeBanner, model, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlHomeBanner, model, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlHomeBanner + `/${id}`, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlHomeBanner + `/${id}`, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlHomeBanner.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlHomeBanner.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

}
