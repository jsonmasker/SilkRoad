import { Injectable } from '@angular/core';
import { SettingModel } from '@models/system-management-models/setting.model';
import { EUrl } from '../../common/url-api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) { }

  getAllSettings(): Observable<SettingModel[]> {
    return this.http.get<SettingModel[]>(EUrl.getAllUrlSetting);
  }

  getSettingByKey(key: any): Observable<SettingModel> {
    return this.http.get<SettingModel>(EUrl.getByKeyUrlSetting + `/${key}`);
  }

  updateSetting(setting: SettingModel): Observable<SettingModel> {
    return this.http.put<SettingModel>(EUrl.updateUrlSetting, setting);
  }
}
