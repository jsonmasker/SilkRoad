import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { AnswerModel } from '@models/survey-models/answer.model';
import { ParticipantModel } from '@models/survey-models/participant.model';
// import { SurveyUIModel } from '@models/survey-models/survey-ui.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }
  getAll(query: any): Observable<APIResponse<Pagination<ParticipantModel>>> {
    return this.http.get<APIResponse<Pagination<ParticipantModel>>>(EUrl.getAllUrlParticipant, { params: query });
  }

  filter(query: any): Observable<APIResponse<Pagination<ParticipantModel>>> {
    return this.http.post<APIResponse<Pagination<ParticipantModel>>>(EUrl.filterUrlParticipant, query);
  }
  
  getById(id: any): Observable<APIResponse<ParticipantModel>> {
    const url = `${EUrl.getByIdUrlParticipant}/${id}`;
    return this.http.get<APIResponse<ParticipantModel>>(url);
  }

  initParticipant(model: ParticipantModel): Observable<APIResponse<ParticipantModel>> {
    return this.http.post<APIResponse<ParticipantModel>>(EUrl.initParticipantUrlParticipant, model);
  }

  addAnswers(answers: AnswerModel[]): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EUrl.addAnswersUrlParticipant, JSON.stringify(answers), { headers: { 'Content-Type': 'application/json' } });
  }

  highlight(id: number): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EUrl.highlightUrlParticipant + `/${id}`, null);
  }

  removeHighlight(id: number): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EUrl.removeHighlightUrlParticipant + `/${id}`, null);
  }

  reject(participantId: any, reason: any): Observable<APIResponse<boolean>> {
    return this.http.post<APIResponse<boolean>>(EUrl.rejectUrlParticipant + `/${participantId}`, JSON.stringify(reason), { headers: { 'Content-Type': 'application/json' } });
  }
}
