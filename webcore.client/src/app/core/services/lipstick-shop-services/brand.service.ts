import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { BrandViewModel } from '@models/lipstick-shop-models/brand.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BrandService {

  constructor(private http: HttpClient) { }
  getAll(pageIndex: number, pageSize : number): Observable<APIResponse<Pagination<BrandViewModel>>> {
    return this.http.get<APIResponse<Pagination<BrandViewModel>>>(EUrl.getAllUrlBrand + `/${pageIndex}/${pageSize}`);
  }
  getAllActive(): Observable<APIResponse<BrandViewModel[]>> {
    return this.http.get<APIResponse<BrandViewModel[]>>(EUrl.getAllActiveUrlBrand);
  }

  getById(id: any): Observable<APIResponse<BrandViewModel>> {
    return this.http.get<APIResponse<BrandViewModel>>(EUrl.getByIdUrlBrand + `/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlBrand, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlBrand, model);
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<BrandViewModel>>> {
    const url = EUrl.getAllDeletedUrlBrand.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<BrandViewModel>>>(url);
  }

  softDelete(id:number):Observable<BaseAPIResponse>{
  return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlBrand+`/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlBrand.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlBrand.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
