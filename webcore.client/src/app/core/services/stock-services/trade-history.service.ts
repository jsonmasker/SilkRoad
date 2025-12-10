import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { ETradeHistoryStockMarketUrl } from '@common/url-api';
import { CompanyModel } from '@models/stock-models/company.model';

@Injectable({ providedIn: 'root' })
export class TradeHistoryService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number, userId: number): Observable<APIResponse<Pagination<CompanyModel>>> {
    const url = `${ETradeHistoryStockMarketUrl.getAllUrl}/${pageIndex}/${pageSize}/${userId}`;
    return this.http.get<APIResponse<Pagination<CompanyModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<CompanyModel>> {
    const url = `${ETradeHistoryStockMarketUrl.getByIdUrl}/${id}`;
    return this.http.get<APIResponse<CompanyModel>>(url);
  }

  create(model: CompanyModel): Observable<BaseAPIResponse> {
    const url = ETradeHistoryStockMarketUrl.createUrl;
    return this.http.post<BaseAPIResponse>(url, model);
  }

  update(model: CompanyModel): Observable<BaseAPIResponse> {
    const url = ETradeHistoryStockMarketUrl.updateUrl;
    return this.http.put<BaseAPIResponse>(url, model);
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = `${ETradeHistoryStockMarketUrl.deleteUrl}/${id}`;
    return this.http.delete<BaseAPIResponse>(url);
  }
}
