import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { ParticipantInfoConfigModel } from '@models/survey-models/participant-info-config.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantInfoConfigService {
  constructor(private http: HttpClient) { }

  getBySurveyFormId(surveyFormId: any): Observable<APIResponse<ParticipantInfoConfigModel[]>> {
    const url = EUrl.getBySurveyFormIdUrlParticipantInfoConfig + `/${surveyFormId}`;
    return this.http.get<APIResponse<ParticipantInfoConfigModel[]>>(url);
  }

  getById(id: any): Observable<APIResponse<ParticipantInfoConfigModel>> {
    const url = EUrl.getByIdUrlParticipantInfoConfig + `/${id}`;
    return this.http.get<APIResponse<ParticipantInfoConfigModel>>(url);
  }

  create(ParticipantInfoConfig: ParticipantInfoConfigModel): Observable<BaseAPIResponse> {
    const url = EUrl.createUrlParticipantInfoConfig;
    return this.http.post<BaseAPIResponse>(url, ParticipantInfoConfig);
  }
  
  update(ParticipantInfoConfig: ParticipantInfoConfigModel): Observable<BaseAPIResponse> {
    const url = EUrl.updateUrlParticipantInfoConfig;
    return this.http.put<BaseAPIResponse>(url, ParticipantInfoConfig);
  }

  delete(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlParticipantInfoConfig + `/${id}`;
    return this.http.delete<BaseAPIResponse>(url);
  }
}
