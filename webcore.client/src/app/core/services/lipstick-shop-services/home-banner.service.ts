import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EUrl } from '@common/url-api';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { HomeBannerViewModel } from '@models/lipstick-shop-models/home-banner.model';
import { Pagination } from '@models/pagination.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeBannerService {

  constructor(private http: HttpClient) { }
  getAll(pageIndex: number, pageSize: number, bannerTypeId: number): Observable<APIResponse<Pagination<HomeBannerViewModel>>> {
    return this.http.get<APIResponse<Pagination<HomeBannerViewModel>>>(EUrl.getAllUrlHomeBanner + `/${pageIndex}/${pageSize}/${bannerTypeId}`);
  }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<HomeBannerViewModel>>> {
    const url = EUrl.getAllDeletedUrlHomeBanner.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<HomeBannerViewModel>>>(url);
  }

  getAllActive(): Observable<APIResponse<HomeBannerViewModel[]>> {
    return this.http.get<APIResponse<HomeBannerViewModel[]>>(EUrl.getAllActiveUrlHomeBanner);
  }

  getByBannerTypeId(bannerTypeId: number): Observable<APIResponse<HomeBannerViewModel[]>> {
    return this.http.get<APIResponse<HomeBannerViewModel[]>>(EUrl.getByBannerTypeId + `/${bannerTypeId}`);;
  }

  getById(id: any): Observable<APIResponse<HomeBannerViewModel>> {
    return this.http.get<APIResponse<HomeBannerViewModel>>(EUrl.getByIdUrlHomeBanner + `/${id}`);
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    return this.http.post<BaseAPIResponse>(EUrl.createUrlHomeBanner, model);
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlHomeBanner, model);
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    return this.http.delete<BaseAPIResponse>(EUrl.softDeleteUrlHomeBanner + `/${id}`);
  }
  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlHomeBanner.concat('/', id.toString());
    return this.http.put<BaseAPIResponse>(url, {});
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlHomeBanner.concat('/', id.toString());
    return this.http.delete<BaseAPIResponse>(url);
  }

}
