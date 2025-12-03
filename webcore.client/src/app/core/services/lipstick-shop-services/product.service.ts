import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { ProductViewModel } from '@models/lipstick-shop-models/product.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<APIResponse<Pagination<ProductViewModel>>> {
    return this.http.get<APIResponse<Pagination<ProductViewModel>>>(EUrl.getAllUrlProduct);
  }

  getById(id: any): Observable<APIResponse<ProductViewModel>> {
    return this.http.get<APIResponse<ProductViewModel>>(EUrl.getByIdUrlProduct + `/${id}`);
  }
  getAllByFilter(query: any): Observable<APIResponse<Pagination<ProductViewModel>>> {
    return this.http.get<APIResponse<Pagination<ProductViewModel>>>(EUrl.getAllUrlProduct);
  }

  getBySearchText(searchText: any): Observable<APIResponse<ProductViewModel[]>> {
    return this.http.get<APIResponse<ProductViewModel[]>>(EUrl.getBySearchTextUrlProduct + `/${searchText}` );
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlProduct, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlProduct, model);
  }
  softDelete(id:number):Observable<BaseAPIResponse>{
  return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlProduct+`/${id}`);
  }
}

