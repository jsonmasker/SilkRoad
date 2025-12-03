import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EUrl } from '@common/url-api';
import { CompanyModel } from '@models/stock-models/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CompanyModel>>> {
    const url = EUrl.getAllUrlCompany.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<CompanyModel>>>(url);
  }

  getAllActive(): Observable<APIResponse<CompanyModel[]>> {
    const url = EUrl.getAllActiveUrlCompany;
    return this.http.get<APIResponse<CompanyModel[]>>(url);
  }

  getAllSymbols(): Observable<APIResponse<string[]>> {
    const url = EUrl.getAllSymbolsUrlCompany;
    return this.http.get<APIResponse<string[]>>(url);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<CompanyModel>>> {
    const url = EUrl.getAllDeletedUrlCompany.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<CompanyModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<CompanyModel>> {
    const url = EUrl.getByIdUrlCompany.concat('/',id.toString());
    return this.http.get<APIResponse<CompanyModel>>(url);
  }

  create(model: CompanyModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlCompany, model);
  }

  update(model: CompanyModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlCompany, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlCompany.concat('/',id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlCompany.concat('/',id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlCompany.concat('/',id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
