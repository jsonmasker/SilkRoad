import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { QuestionModel } from '@models/survey-models/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getById(id: any): Observable<APIResponse<QuestionModel>> {
    return this.http.get<APIResponse<QuestionModel>>(EUrl.getByIdUrlQuestion + `/${id}`);
  }
  getEagerLoadingById(id: any): Observable<APIResponse<QuestionModel>> {
    return this.http.get<APIResponse<QuestionModel>>(EUrl.getEagerLoadingByIdUrlQuestion + `/${id}`);
  }


  create(model: QuestionModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlQuestion, model);
  }
  update(model: QuestionModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlQuestion, model);
  }

  getBySurveyFormId(surveyFormId: any): Observable<APIResponse<QuestionModel[]>> {
    return this.http.get<APIResponse<QuestionModel[]>>(EUrl.getBySurveyFormIdUrlQuestion + `/${surveyFormId}`);
  }

  getByQuestionGroupId(questionGroupId: any): Observable<APIResponse<QuestionModel[]>> {
    return this.http.get<APIResponse<QuestionModel[]>>(EUrl.getByQuestionGroupIdUrlQuestion + `/${questionGroupId}`);
  }

  delete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.deleteUrlQuestion + `/${id}`);
  }
}
