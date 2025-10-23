import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { JwtModel } from '@models/system-management-models/jwt.model';
import { EUrl } from '@common/url-api';
import { ChangePasswordModel } from '@models/system-management-models/change-password.model';
import { AuthenticationService } from './authentication.service';
import { LoginModel } from '@models/system-management-models/login.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }


  changePassword(changePasswordModel: ChangePasswordModel): Observable<any> {
    return this.http.post<ChangePasswordModel>(EUrl.changePasswordUrlMyAccount, changePasswordModel, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<ChangePasswordModel>(EUrl.changePasswordUrlMyAccount, changePasswordModel, { headers: this.authenticationService.getHeaders() }).pipe()));
        } else {
           return throwError(() => error);
        }
      })
    );
  }
  recoverPassword(email: string): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.recoverPasswordUrl, {email});
  }
  resetPassword(token: string, email: string, password: any, confirmPassword:any): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.resetPasswordUrl, { token, email, password, confirmPassword });
  }
}
