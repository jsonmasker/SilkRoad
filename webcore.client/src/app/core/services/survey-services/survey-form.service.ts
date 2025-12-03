import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyFormService {
  constructor(private http: HttpClient) { }
  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SurveyFormModel>>> {
    const url = EUrl.getAllUrlSurveyForm + '/' + pageIndex + '/' + pageSize;
    return this.http.get<APIResponse<Pagination<SurveyFormModel>>>(url);
  }

  filter(filter: any): Observable<APIResponse<Pagination<SurveyFormModel>>> {
    const url = EUrl.filterUrlSurveyForm;
    return this.http.post<APIResponse<Pagination<SurveyFormModel>>>(url, filter);
  }

  getAllActive(): Observable<APIResponse<SurveyFormModel[]>> {
    return this.http.get<APIResponse<SurveyFormModel[]>>(EUrl.getAllActiveUrlSurveyForm);
  }

  getById(id: any): Observable<APIResponse<SurveyFormModel>> {
    return this.http.get<APIResponse<SurveyFormModel>>(EUrl.getByIdUrlSurveyForm + `/${id}`);
  }

  getEagerById(id: any): Observable<APIResponse<SurveyFormModel>> {
    const url = EUrl.getEagerByIdUrlSurveyForm + `/${id}`;
    return this.http.get<APIResponse<SurveyFormModel>>(url);
  }

  getPublicFormById(id: any): Observable<APIResponse<SurveyFormModel>> {
    const url = EUrl.getPublicFormByIdUrlSurveyForm + `/${id}`;
    return this.http.get<APIResponse<SurveyFormModel>>(url);
  }

  getReviewFormById(id: any): Observable<APIResponse<SurveyFormModel>> {
    const url = EUrl.getReviewFormByIdUrlSurveyForm + `/${id}`;
    return this.http.get<APIResponse<SurveyFormModel>>(url);
  }

  create(model: SurveyFormModel): Observable<APIResponse<SurveyFormModel>> {
    return this.http.post<APIResponse<SurveyFormModel>>(EUrl.createUrlSurveyForm, model);
  }

  update(model: SurveyFormModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlSurveyForm, model);
  }

  softDelete(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlSurveyForm + `/${id}`;
    return this.http.delete<BaseAPIResponse>(url);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SurveyFormModel>>> {
    const url = EUrl.getAllDeletedUrlSurveyForm + `/${pageIndex}/${pageSize}`;
    return this.http.get<APIResponse<Pagination<SurveyFormModel>>>(url);
  }

  restore(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlSurveyForm + `/${id}`;
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlSurveyForm + `/${id}`;
    return this.http.delete<BaseAPIResponse>(url);
  }

  public(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.publicUrlSurveyForm + `/${id}`;
    return this.http.put<BaseAPIResponse>(url, {});
  }

  unpublic(id: any): Observable<BaseAPIResponse> {
    const url = EUrl.unPublicUrlSurveyForm + `/${id}`;
    return this.http.put<BaseAPIResponse>(url, {});
  }

  deactivate(id: number): Observable<BaseAPIResponse> {
    const url = `${EUrl.deactivateUrlSurveyForm}/${id}`;
    return this.http.put<BaseAPIResponse>(url, null);
  }

  activate(id: number): Observable<BaseAPIResponse> {
    const url = `${EUrl.activateUrlSurveyForm}/${id}`;
    return this.http.put<BaseAPIResponse>(url, null);
  }

  checkValidForm(id: any): Observable<APIResponse<boolean>> {
    const url = EUrl.checkValidFormUrlSurveyForm + `/${id}`;
    return this.http.get<APIResponse<boolean>>(url);
  }
}
