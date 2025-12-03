import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EUrl } from '@common/url-api';
import { IndustryModel } from '@models/stock-models/industry.model';

@Injectable({ providedIn: 'root' })
export class IndustryService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<IndustryModel>>> {
    const url = EUrl.getAllUrlIndustry.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<IndustryModel>>>(url);
  }

  getAllActive(pageIndex: number, pageSize: number, search?: string): Observable<APIResponse<Pagination<IndustryModel>>> {
    let url = EUrl.getAllActiveUrlIndustry.concat(`/${pageIndex}/${pageSize}`);
    if (search) url = url.concat(`/${encodeURIComponent(search)}`);
    return this.http.get<APIResponse<Pagination<IndustryModel>>>(url);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<IndustryModel>>> {
    const url = EUrl.getAllDeletedUrlIndustry.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<IndustryModel>>>(url);
  }

  getById(id: number): Observable<APIResponse<IndustryModel>> {
    const url = EUrl.getByIdUrlIndustry.concat('/', id.toString());
    return this.http.get<APIResponse<IndustryModel>>(url);
  }

  create(model: IndustryModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlIndustry, model);
  }

  update(model: IndustryModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlIndustry, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlIndustry.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlIndustry.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlIndustry.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
