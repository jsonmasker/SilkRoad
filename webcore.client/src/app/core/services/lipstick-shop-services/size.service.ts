import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { SizeViewModel } from '@models/lipstick-shop-models/size.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }
  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SizeViewModel>>> {
    return this.http.get<APIResponse<Pagination<SizeViewModel>>>(EUrl.getAllUrlSize + `/${pageIndex}/${pageSize}`);
  }
  getAllActive(): Observable<APIResponse<SizeViewModel[]>> {
    return this.http.get<APIResponse<SizeViewModel[]>>(EUrl.getAllActiveUrlSize);
  }

  getById(id: any): Observable<APIResponse<SizeViewModel>> {
    return this.http.get<APIResponse<SizeViewModel>>(EUrl.getByIdUrlSize + `/${id}`);
  }

  create(model: SizeViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlSize, model);
  }

  update(model: SizeViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlSize, model);
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SizeViewModel>>> {
    const url = EUrl.getAllDeletedUrlSize.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<SizeViewModel>>>(url);
  }

  softDelete(id:number):Observable<BaseAPIResponse>{
    return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlSize+`/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlSize.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlSize.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
