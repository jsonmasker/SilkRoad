import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { SubCategoryViewModel } from '@models/lipstick-shop-models/sub-category.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
 constructor(private http: HttpClient) { }
  getAll(pageIndex:number, pageSize : number, categoryId: number): Observable<APIResponse<Pagination<SubCategoryViewModel>>> {
    return this.http.get<APIResponse<Pagination<SubCategoryViewModel>>>(EUrl.getAllUrlSubCategory + `/${pageIndex}/${pageSize}/${categoryId}`);
  }
  getAllActive(): Observable<APIResponse<SubCategoryViewModel[]>> {
    return this.http.get<APIResponse<SubCategoryViewModel[]>>(EUrl.getAllActiveUrlSubCategory);
  }
  getByCategoryId(categoryId:number): Observable<APIResponse<SubCategoryViewModel[]>> {
    return this.http.get<APIResponse<SubCategoryViewModel[]>>(EUrl.getByCategoryIdUrlSubCategory + `/${categoryId}`);
  }

  getById(id: any): Observable<APIResponse<SubCategoryViewModel>> {
    return this.http.get<APIResponse<SubCategoryViewModel>>(EUrl.getByIdUrlSubCategory + `/${id}`);
  }

  create(model: SubCategoryViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlSubCategory, model);
  }

  update(model: SubCategoryViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlSubCategory, model);
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SubCategoryViewModel>>> {
    const url = EUrl.getAllDeletedUrlSubCategory.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<SubCategoryViewModel>>>(url);
  }

  softDelete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlSubCategory + `/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlSubCategory.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlSubCategory.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
