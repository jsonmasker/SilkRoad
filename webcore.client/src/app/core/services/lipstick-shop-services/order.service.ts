import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { OrderModel } from '@models/lipstick-shop-models/order.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  getAll(query: any): Observable<APIResponse<Pagination<OrderModel>>> {
    return this.http.get<APIResponse<Pagination<OrderModel>>>(EUrl.getAllUrlOrder, { params: query });
  }

  getById(id: any): Observable<APIResponse<OrderModel>> {
    return this.http.get<APIResponse<OrderModel>>(EUrl.getByIdUrlOrder + `/${id}`);
  }

  create(model: OrderModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlOrder, model);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<OrderModel>>> {
    const url = EUrl.getAllDeletedUrlOrder.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<OrderModel>>>(url);
  }

  update(model: OrderModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlOrder, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlOrder + `/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlOrder.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }
}
