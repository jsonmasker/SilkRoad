import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { PageTypeViewModel } from '@models/lipstick-shop-models/page-type.model';
import { Pagination } from '@models/pagination.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTypeService {

  constructor(private http: HttpClient) { }
  getAll(pageIndex: number, pagePageType: number): Observable<APIResponse<Pagination<PageTypeViewModel>>> {
    return this.http.get<APIResponse<Pagination<PageTypeViewModel>>>(EUrl.getAllUrlPageType + `/${pageIndex}/${pagePageType}`);
  }
  getAllActive(): Observable<APIResponse<PageTypeViewModel[]>> {
    return this.http.get<APIResponse<PageTypeViewModel[]>>(EUrl.getAllActiveUrlPageType);
  }
  getEPageType(): Observable<APIResponse<string[]>> {
    return this.http.get<APIResponse<string[]>>(EUrl.getEPageTypeUrlPageType);
  }

  getById(id: any): Observable<APIResponse<PageTypeViewModel>> {
    return this.http.get<APIResponse<PageTypeViewModel>>(EUrl.getByIdUrlPageType + `/${id}`);
  }

  create(model: PageTypeViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlPageType, model);
  }

  update(model: PageTypeViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlPageType, model);
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<PageTypeViewModel>>> {
    const url = EUrl.getAllDeletedUrlPageType.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<PageTypeViewModel>>>(url);
  }

  softDelete(id:number):Observable<BaseAPIResponse>{
  return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlPageType+`/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlPageType.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlPageType.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
