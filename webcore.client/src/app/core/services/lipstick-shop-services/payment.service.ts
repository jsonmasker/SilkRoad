import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse } from '@models/api-response.model';
import { PaymentViewModel } from '@models/lipstick-shop-models/payment.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  getAll(query: any): Observable<APIResponse<Pagination<PaymentViewModel>>> {
    return this.http.get<APIResponse<Pagination<PaymentViewModel>>>(EUrl.getAllUrlPayment, { params: query });
  }

  getById(id: any): Observable<APIResponse<PaymentViewModel>> {
    return this.http.get<APIResponse<PaymentViewModel>>(EUrl.getByIdUrlPayment + `/${id}`);
  }
}
