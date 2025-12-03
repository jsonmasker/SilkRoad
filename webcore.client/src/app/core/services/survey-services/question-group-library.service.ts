import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EUrl } from '@common/url-api';
import { OptionModel } from '@models/option.model';
import { QuestionGroupLibraryModel } from '@models/survey-models/question-group-library.model';

@Injectable({ providedIn: 'root' })
export class QuestionGroupLibraryService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<QuestionGroupLibraryModel>>> {
    const url = EUrl.getAllUrlQuestionGroupLibrary.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<QuestionGroupLibraryModel>>>(url);
  }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    const url = EUrl.getOptionListUrlQuestionGroupLibrary;
    return this.http.get<APIResponse<OptionModel[]>>(url);
  }
    getTreeOptionList(): Observable<APIResponse<OptionModel[]>> {
    const url = EUrl.getTreeOptionListUrlQuestionGroupLibrary;
    return this.http.get<APIResponse<OptionModel[]>>(url);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<QuestionGroupLibraryModel>>> {
    const url = EUrl.getAllDeletedUrlQuestionGroupLibrary.concat(`/${pageIndex}/${pageSize}`);
        return this.http.get<APIResponse<Pagination<QuestionGroupLibraryModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<QuestionGroupLibraryModel>> {
    const url = EUrl.getByIdUrlQuestionGroupLibrary.concat('/',id.toString());
    return this.http.get<APIResponse<QuestionGroupLibraryModel>>(url);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    const url = EUrl.createUrlQuestionGroupLibrary;
    return this.http.post<BaseAPIResponse>(url, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlQuestionGroupLibrary, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlQuestionGroupLibrary.concat('/',id.toString());
    return this.http.put<BaseAPIResponse>(url,{});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlQuestionGroupLibrary.concat('/',id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlQuestionGroupLibrary.concat('/',id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
