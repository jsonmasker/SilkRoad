import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { PageIntroductionViewModel } from '@models/lipstick-shop-models/page-introduction.model';
import { Pagination } from '@models/pagination.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageIntroductionService {

  constructor(private http: HttpClient) { }
  getAll(pageTypeId: number, pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PageIntroductionViewModel>>> {
    return this.http.get<APIResponse<Pagination<PageIntroductionViewModel>>>(EUrl.getAllUrlPageIntroduction + `/${pageTypeId}/${pageIndex}/${pageSize}`);
  }
  getAllActive(): Observable<APIResponse<PageIntroductionViewModel[]>> {
    return this.http.get<APIResponse<PageIntroductionViewModel[]>>(EUrl.getAllActiveUrlPageIntroduction);
  }

  getById(id: any): Observable<APIResponse<PageIntroductionViewModel>> {
    return this.http.get<APIResponse<PageIntroductionViewModel>>(EUrl.getByIdUrlPageIntroduction + `/${id}`);
  }

  create(formData: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlPageIntroduction, formData);
  }

  update(formData: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlPageIntroduction, formData);
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PageIntroductionViewModel>>> {
    const url = EUrl.getAllDeletedUrlPageIntroduction.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<PageIntroductionViewModel>>>(url);
  }

  softDelete(id:number):Observable<BaseAPIResponse>{
  return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlPageIntroduction+`/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlPageIntroduction.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlPageIntroduction.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
