import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { EUrl } from '@common/url-api';
import { JwtModel } from '@models/system-management-models/jwt.model';
import { jwtDecode } from 'jwt-decode';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { LoginModel } from '@models/system-management-models/login.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly tokenKey = 'token';
  private readonly refreshTokenKey = 'refreshToken';
  constructor(private http: HttpClient) { }
  
  login(account: LoginModel): Observable<BaseAPIResponse> {
    return this.http.post<APIResponse<JwtModel>>(EUrl.loginUrl, account).pipe(
      switchMap((response: APIResponse<JwtModel>) => {
        if (response.success) {
          localStorage.setItem(this.tokenKey, response.data.token);
          localStorage.setItem(this.refreshTokenKey, response.data.refreshToken);
        }
        return new Observable<BaseAPIResponse>(observer => {
          observer.next({ success: response.success, message: response.message });
          observer.complete();
        });
      }),
      catchError((exception) => {
        return new Observable<BaseAPIResponse>(observer => {
          observer.next({ success: false, message: exception.message || 'Login failed' });
          observer.complete();
        });
      })
    );
  }

  checkLogin(): Observable<boolean> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (!refreshToken) {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    }
    const headers = new HttpHeaders().set('refreshToken', refreshToken);

    return new Observable<boolean>(observer => {
      this.http.get(EUrl.validateRefreshTokenUrl, { headers }).subscribe({
        next: () => {
          observer.next(true);
          observer.complete();
        },
        error: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  logOut(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
  
  getAccessToken(): any {
    return localStorage.getItem(this.tokenKey);
  }
  
  reNewToken(): Observable<any> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    const token = localStorage.getItem(this.tokenKey);
    if (!refreshToken || !token) {
      return new Observable(observer => {
        observer.next(false);
        observer.complete();
      });
    }
    const headers = new HttpHeaders().set('refreshToken', refreshToken).set('token', token);
    return this.http.get<APIResponse<JwtModel>>(EUrl.reNewToken, { headers }).pipe(
      map((result) => {

        localStorage.setItem('token', result.data.token);
        return result;
      })
    );
  }
  
  getHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  
  getUserId(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const claims = jwtDecode<any>(token);
      return claims?.Id;
    }
    return null;
  }
}
