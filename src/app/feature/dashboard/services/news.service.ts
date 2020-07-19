import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TheNewYorkTimesAPILinks} from '../enums/theNewYorkTimesAPILinks';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNewYorkTimesTopNews(newsTypeAPILink: TheNewYorkTimesAPILinks): Observable<any> {
    return this.http.get(newsTypeAPILink + environment.THE_NEW_YORK_TIMES_API_KEY);
  }
}
