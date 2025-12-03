import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { PageContentViewModel } from '@models/lipstick-shop-models/page-content.model';
import { Pagination } from '@models/pagination.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageContentService {

  constructor(private http: HttpClient) { }
  getAll(pageIndex: number, pagePageContent: number, pageTypeId : number): Observable<APIResponse<Pagination<PageContentViewModel>>> {
    return this.http.get<APIResponse<Pagination<PageContentViewModel>>>(EUrl.getAllUrlPageContent + `/${pageIndex}/${pagePageContent}/${pageTypeId}`);
  }
  getAllActive(): Observable<APIResponse<PageContentViewModel[]>> {
    return this.http.get<APIResponse<PageContentViewModel[]>>(EUrl.getAllActiveUrlPageContent);
  }

  getById(id: any): Observable<APIResponse<PageContentViewModel>> {
    return this.http.get<APIResponse<PageContentViewModel>>(EUrl.getByIdUrlPageContent + `/${id}`);
  }

  create(model: PageContentViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlPageContent, model);
  }

  update(model: PageContentViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlPageContent, model);
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PageContentViewModel>>> {
    const url = EUrl.getAllDeletedUrlPageContent.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<PageContentViewModel>>>(url);
  }

  softDelete(id:number):Observable<BaseAPIResponse>{
  return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlPageContent+`/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlPageContent.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlPageContent.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
