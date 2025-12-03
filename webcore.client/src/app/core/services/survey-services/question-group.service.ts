import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionGroupService {
  constructor(private http: HttpClient) { }

  getById(id: any): Observable<APIResponse<QuestionGroupModel>> {
    return this.http.get<APIResponse<QuestionGroupModel>>(EUrl.getByIdUrlQuestionGroup + `/${id}`);
  }

  create(questiongroup: QuestionGroupModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlQuestionGroup, questiongroup);
  }
  
  update(questiongroup: QuestionGroupModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlQuestionGroup, questiongroup);
  }
  

  getBySurveyFormId(surveyFormId: any): Observable<APIResponse<QuestionGroupModel[]>> {
    return this.http.get<APIResponse<QuestionGroupModel[]>>(EUrl.getBySurveyFormIdUrlQuestionGroup + `/${surveyFormId}`);
  }

  delete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.deleteUrlQuestionGroup + `/${id}`);
  }
}
