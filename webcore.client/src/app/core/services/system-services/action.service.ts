import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EUrl } from '@common/url-api';

import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { ActionModel } from '@models/system-management-models/module.model';
@Injectable({
  providedIn: 'root'
})
export class ActionService {
  constructor(private http: HttpClient) { }
   getAll(pageIndex :number, pageSize : number): Observable<APIResponse<Pagination<ActionModel>>> {
      return this.http.get<APIResponse<Pagination<ActionModel>>>(EUrl.getAllUrlAction + `/${pageIndex}/${pageSize}`);
    }

    getAllActive(): Observable<APIResponse<ActionModel[]>> {
      return this.http.get<APIResponse<ActionModel[]>>(EUrl.getAllActiveUrlAction);
    }

    getEAction(): Observable<APIResponse<any[]>> {
      return this.http.get<APIResponse<any[]>>(EUrl.getEActionUrlAction);
    }
    create(data: FormData): Observable<BaseAPIResponse> {
      return this.http.post<BaseAPIResponse>(EUrl.createUrlAction, data);
    }
    getById(id: number): Observable<APIResponse<ActionModel>> {
      return this.http.get<APIResponse<ActionModel>>(EUrl.getByIdUrlAction +  `/${id}`);
    }

    update(data: ActionModel): Observable<BaseAPIResponse> {
      return this.http.put<BaseAPIResponse>(EUrl.updateUrlAction, data);
    }
}
