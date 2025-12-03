import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EUrl } from '@common/url-api';
import { QuestionLibraryModel } from '@models/survey-models/question-library.model';

@Injectable({ providedIn: 'root' })
export class QuestionLibraryService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<QuestionLibraryModel>>> {
    const url = EUrl.getAllUrlQuestionLibrary.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<QuestionLibraryModel>>>(url);
  }
  getByFilter(filter: any): Observable<APIResponse<Pagination<QuestionLibraryModel>>> {
    const url = EUrl.filterUrlQuestionLibrary;
    return this.http.post<APIResponse<Pagination<QuestionLibraryModel>>>(url, filter);
  }

//   getOptionList(): Observable<APIResponse<OptionModel[]>> {
//     const url = EUrl.getOptionListUrlQuestionLibrary;
//     return this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.GetHeaders() }).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.authenticationService.ReNewToken().pipe(
//             switchMap(() => this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.GetHeaders() }))
//           );
//         } else {
//           return throwError(() =>error);
//         }
//       })
//     );
//   }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<QuestionLibraryModel>>> {
    const url = EUrl.getAllDeletedUrlQuestionLibrary.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<QuestionLibraryModel>>>(url);
  }

  getById(id: any): Observable<APIResponse<QuestionLibraryModel>> {
    const url = EUrl.getByIdUrlQuestionLibrary.concat('/',id.toString());
    return this.http.get<APIResponse<QuestionLibraryModel>>(url);
  }

    getEagerLoadingById(id: any): Observable<APIResponse<QuestionLibraryModel>> {
    const url = EUrl.getEagerLoadingByIdUrlQuestionLibrary.concat('/',id.toString());
    return this.http.get<APIResponse<QuestionLibraryModel>>(url);
  }


  create(model: FormData): Observable<BaseAPIResponse> {
    const url = EUrl.createUrlQuestionLibrary;
    return this.http.post<BaseAPIResponse>(url, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlQuestionLibrary, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlQuestionLibrary.concat('/',id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlQuestionLibrary.concat('/',id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlQuestionLibrary.concat('/',id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
