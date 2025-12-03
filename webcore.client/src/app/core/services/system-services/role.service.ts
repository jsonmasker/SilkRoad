import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleModel } from '@models/system-management-models/role.model';
import { EUrl } from '@common/url-api';

import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { OptionModel } from '@models/option.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http : HttpClient) { }

  getOptionList(): Observable<APIResponse<OptionModel[]>> {
    const url = EUrl.getOptionListUrlRole;
    return this.http.get<APIResponse<OptionModel[]>>(url);
  }

  getAll(pageIndex : number, pageSize : Number): Observable<APIResponse<Pagination<RoleModel>>> {
    return this.http.get<APIResponse<Pagination<RoleModel>>>(EUrl.getAllUrlRole + `/${pageIndex}/${pageSize}`);
  }
  getAllActive(): Observable<APIResponse<RoleModel[]>> {
    return this.http.get<APIResponse<RoleModel[]>>(EUrl.getAllActiveUrlRole);
  }
  getById(id: number): Observable<APIResponse<RoleModel>> {
    return this.http.get<APIResponse<RoleModel>>(EUrl.getByIdUrlRole +`/${id}`);
  }
  createRole(role: RoleModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlRole, role);
  }

  updateRole(role: RoleModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlRole, role);
  }

}
