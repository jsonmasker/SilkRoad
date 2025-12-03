import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TopicViewModel } from '@models/lipstick-shop-models/topic.model';
import { Observable } from 'rxjs';
import { EUrl } from '@common/url-api';
import { Pagination } from '@models/pagination.model';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
constructor(private http: HttpClient) { }
  getAll(pageIndex:number , pageSize : number): Observable<APIResponse<Pagination<TopicViewModel>>> {
    return this.http.get<APIResponse<Pagination<TopicViewModel>>>(EUrl.getAllUrlTopic + `/${pageIndex}/${pageSize}`);
  }
  getAllActive(): Observable<APIResponse<TopicViewModel[]>> {
    return this.http.get<APIResponse<TopicViewModel[]>>(EUrl.getAllActiveUrlTopic);
  }

  getById(id: any): Observable<APIResponse<TopicViewModel>> {
    return this.http.get<APIResponse<TopicViewModel>>(EUrl.getByIdUrlTopic + `/${id}`);
  }

  create(unit: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlTopic, unit);
  }

  update(unit: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlTopic, unit);
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<TopicViewModel>>> {
    const url = EUrl.getAllDeletedUrlTopic.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<TopicViewModel>>>(url);
  }

  softDelete(id: any): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlTopic + `/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlTopic.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlTopic.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
