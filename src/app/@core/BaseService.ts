import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiUtils} from './api/ApiUtils';

export abstract class BaseService<T> {

  protected constructor(protected http: HttpClient) {
  }

  public save(obj: T): Observable<any> {
    const req = ApiUtils.getRequest(this.getApi());
    return this.http.post(req.url, obj, {headers: req.header});
  }

  public update(id: string, obj: T): Observable<any> {
    const api = `${this.getApi()}/${id}`;
    const req = ApiUtils.getRequest(api);
    return this.http.patch(req.url, obj, {headers: req.header});
  }

  public delete(id: string): Observable<any> {
    const api = `${this.getApi()}/${id}`;
    const req = ApiUtils.getRequest(api);
    return this.http.delete(req.url, {headers: req.header});
  }

  protected abstract getApi(): string;
}
