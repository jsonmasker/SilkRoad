import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { BlogViewModel } from '@models/lipstick-shop-models/blog.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  
  getAll(pageIndex: number, pageSize: number, topicId: number): Observable<APIResponse<Pagination<BlogViewModel>>> {
    return this.http.get<APIResponse<Pagination<BlogViewModel>>>(EUrl.getAllUrlBlog + `/${pageIndex}/${pageSize}/${topicId}`);
  }
  getAllActive(): Observable<APIResponse<BlogViewModel[]>> {
    return this.http.get<APIResponse<BlogViewModel[]>>(EUrl.getAllActiveUrlBlog);
  }

  getById(id: any): Observable<APIResponse<BlogViewModel>> {
    return this.http.get<APIResponse<BlogViewModel>>(EUrl.getByIdUrlBlog + `/${id}`);
  }
  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlBlog, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlBlog, model);
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<BlogViewModel>>> {
    const url = EUrl.getAllDeletedUrlBlog.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<BlogViewModel>>>(url);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlBlog + `/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlBlog.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  // delete(id: number): Observable<BaseAPIResponse> {
  //   const url = EUrl.deleteUrlBlog.concat('/', id.toString());
  //   return this.http.delete<BaseAPIResponse>(url);
  // }
}

