import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { OptionModel } from '@models/option.model';
import { QuestionTypeModel } from '@models/survey-models/question-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<APIResponse<QuestionTypeModel[]>> {
    return this.http.get<APIResponse<QuestionTypeModel[]>>(EUrl.getAllUrlQuestionType);
  }
    getOptionList(): Observable<APIResponse<OptionModel[]>> {
      const url = EUrl.getOptionListUrlQuestionType;
      return this.http.get<APIResponse<OptionModel[]>>(url);
    }
}
