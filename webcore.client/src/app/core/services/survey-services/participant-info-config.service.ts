import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { ParticipantInfoConfigModel } from '@models/survey-models/participant-info-config.model';
import { AuthenticationService } from '@services/system-services/authentication.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantInfoConfigService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getBySurveyFormId(surveyFormId: any): Observable<APIResponse<ParticipantInfoConfigModel[]>> {
    const url = EUrl.getBySurveyFormIdUrlParticipantInfoConfig + `/${surveyFormId}`;
    return this.http.get<APIResponse<ParticipantInfoConfigModel[]>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<ParticipantInfoConfigModel[]>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getById(id: any): Observable<APIResponse<ParticipantInfoConfigModel>> {
    const url = EUrl.getByIdUrlParticipantInfoConfig + `/${id}`;
    return this.http.get<APIResponse<ParticipantInfoConfigModel>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<ParticipantInfoConfigModel>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  create(ParticipantInfoConfig: ParticipantInfoConfigModel): Observable<BaseAPIResponse> {
    const url = EUrl.createUrlParticipantInfoConfig;
    return this.http.post<BaseAPIResponse>(url, ParticipantInfoConfig, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(url, ParticipantInfoConfig, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
  
  update(ParticipantInfoConfig: ParticipantInfoConfigModel): Observable<BaseAPIResponse> {
    const url = EUrl.updateUrlParticipantInfoConfig;
    return this.http.put<BaseAPIResponse>(url, ParticipantInfoConfig, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, ParticipantInfoConfig, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  delete(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlParticipantInfoConfig + `/${id}`;
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
