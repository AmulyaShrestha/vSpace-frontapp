import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseService} from './BaseService';
import {User} from '../auth/model/User';
import {ApiUtils} from './api/ApiUtils';

@Injectable({providedIn: 'root'})
export class AuthenticationService extends BaseService<User> {
  static API = 'users';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  public userLogin(userDto): Observable<any> {
    const api = `${AuthenticationService.API}/login`;
    const req = ApiUtils.getRequest(api);
    return this.http.post(req.url, userDto, {headers: req.header});
  }

  public userUpdate(userDto): Observable<any> {
    const api = `${AuthenticationService.API}/update`;
    const req = ApiUtils.getRequest(api);
    return this.http.put(req.url, userDto, {headers: req.header});
  }

  public logOutAll(userDto): Observable<any> {
    const api = `${AuthenticationService.API}/me/logoutall`;
    const req = ApiUtils.getRequest(api);
    return this.http.post(req.url, userDto, {headers: req.header});
  }

  public getActiveUser(): Observable<any> {
    const api = `${this.getApi()}/me`;
    const req = ApiUtils.getRequest(api);
    return this.http.get(req.url, {headers: req.header});
  }

  public forgotPasswordSendEmail(email): Observable<any> {
    const api = `${AuthenticationService.API}/reset-password/${email}`;
    const req = ApiUtils.getRequest(api);
    return this.http.get(req.url);
  }

  public resetPassword(resetObj): Observable<any> {
    const api = `${AuthenticationService.API}/reset-password`;
    const req = ApiUtils.getRequest(api);
    return this.http.post(req.url, resetObj);
  }

  protected getApi(): string {
    return AuthenticationService.API;
  }
}
