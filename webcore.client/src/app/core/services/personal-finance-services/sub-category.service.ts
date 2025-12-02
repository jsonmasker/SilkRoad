import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { APIResponse, BaseAPIResponse } from '@models/api-response.model';
import { Pagination } from '@models/pagination.model';
import { EUrl } from '@common/url-api';
import { catchError, switchMap } from 'rxjs';
import { AuthenticationService } from '../system-services/authentication.service';
import { SubCategoryModel } from '@models/personal-finance-models';

@Injectable({ providedIn: 'root' })
export class SubCategoryService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getAll(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SubCategoryModel>>> {
    const url = EUrl.getAllUrlSubCategoryPF.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<SubCategoryModel>>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<SubCategoryModel>>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  // getOptionList(): Observable<APIResponse<OptionModel[]>> {
  //   const url = EUrl.getOptionListUrlSubCategoryPF;
  //   return this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
  //     catchError(error => {
  //       if (error.status === 401) {
  //         return this.authenticationService.reNewToken().pipe(
  //           switchMap(() => this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.getHeaders() }))
  //         );
  //       } else {
  //         return throwError(() =>error);
  //       }
  //     })
  //   );
  // }
  //   getTreeOptionList(): Observable<APIResponse<OptionModel[]>> {
  //   const url = EUrl.getTreeOptionListUrlSubCategoryPF;
  //   return this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
  //     catchError(error => {
  //       if (error.status === 401) {
  //         return this.authenticationService.reNewToken().pipe(
  //           switchMap(() => this.http.get<APIResponse<OptionModel[]>>(url, { headers: this.authenticationService.getHeaders() }))
  //         );
  //       } else {
  //         return throwError(() =>error);
  //       }
  //     })
  //   );
  // }

  getAllDeleted(pageIndex: number, pageSize: number): Observable<APIResponse<Pagination<SubCategoryModel>>> {
    const url = EUrl.getAllDeletedUrlSubCategoryPF.concat(`/${pageIndex}/${pageSize}`);
    return this.http.get<APIResponse<Pagination<SubCategoryModel>>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<Pagination<SubCategoryModel>>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  getById(id: number): Observable<APIResponse<SubCategoryModel>> {
    const url = EUrl.getByIdUrlSubCategoryPF.concat('/',id.toString());
    return this.http.get<APIResponse<SubCategoryModel>>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.get<APIResponse<SubCategoryModel>>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  create(model: FormData): Observable<BaseAPIResponse> {
    const url = EUrl.createUrlSubCategoryPF;
    return this.http.post<BaseAPIResponse>(url, model, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.post<BaseAPIResponse>(url, model, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  update(model: FormData): Observable<BaseAPIResponse> {
    return this.http.put<BaseAPIResponse>(EUrl.updateUrlSubCategoryPF, model, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(EUrl.updateUrlSubCategoryPF, model, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  softDelete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.softDeleteUrlSubCategoryPF.concat('/',id.toString());
    return this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  restore(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.restoreUrlSubCategoryPF.concat('/',id.toString());
    return this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.put<BaseAPIResponse>(url, {}, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }

  delete(id: number): Observable<BaseAPIResponse> {
    const url = EUrl.deleteUrlSubCategoryPF.concat('/',id.toString());
    return this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authenticationService.reNewToken().pipe(
            switchMap(() => this.http.delete<BaseAPIResponse>(url, { headers: this.authenticationService.getHeaders() }))
          );
        } else {
          return throwError(() =>error);
        }
      })
    );
  }
}
