import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { ColorViewModel } from '@models/lipstick-shop-models/color.model';
import { Pagination } from '@models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }
  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<ColorViewModel>>> {
    return this.http.get<APIResponse<Pagination<ColorViewModel>>>(EUrl.getAllUrlColor + `/${pageIndex}/${pageSize}`);
  }
  getAllActive(): Observable<APIResponse<ColorViewModel[]>> {
    return this.http.get<APIResponse<ColorViewModel[]>>(EUrl.getAllActiveUrlColor);
  }

  getById(id: any): Observable<APIResponse<ColorViewModel>> {
    return this.http.get<APIResponse<ColorViewModel>>(EUrl.getByIdUrlColor + `/${id}`);
  }

  create(model: ColorViewModel): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlColor, model);
  }

  update(model: ColorViewModel): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlColor, model);
  }
  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<ColorViewModel>>> {
    const url = EUrl.getAllDeletedUrlColor.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<ColorViewModel>>>(url);
  }

  softDelete(id:number):Observable<BaseAPIResponse>{
    return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlColor+`/${id}`);
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlColor.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlColor.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }
}
