import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { CategoryViewModel } from '@models/lipstick-shop-models/category.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CategoryViewModel>>> {
    return this.http.get<APIResponse<Pagination<CategoryViewModel>>>(EUrl.getAllUrlCategory + `/${pageIndex}/${pageSize}`);
  }
  getAllActive(): Observable<APIResponse<CategoryViewModel[]>> {
    return this.http.get<APIResponse<CategoryViewModel[]>>(EUrl.getAllActiveUrlCategory);
  }

  getById(id: any): Observable<APIResponse<CategoryViewModel>> {
    return this.http.get<APIResponse<CategoryViewModel>>(EUrl.getByIdUrlCategory + `/${id}`);
  }

  create(model: CategoryViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlCategory, model);
  }

  update(model: CategoryViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlCategory, model);
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CategoryViewModel>>> {
    const url = EUrl.getAllDeletedUrlCategory.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<CategoryViewModel>>>(url);
  }

  softDelete(id:number):Observable<BaseAPIResponse>{
  return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlCategory+`/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlCategory.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlCategory.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
