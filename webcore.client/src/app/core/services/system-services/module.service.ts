import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleModel } from '@models/system-management-models/module.model';
import { EUrl } from '@common/url-api';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient ) { }

  getModules(): Observable<ModuleModel[]> {
    return this.http.get<ModuleModel[]>(EUrl.getAllUrlModule);
  }
}
