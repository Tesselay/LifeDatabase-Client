import { Injectable } from '@angular/core';
import {environment} from '../../../resources/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../dataobjects/page';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getArticles(params: HttpParams) {
    return this.http.get<Page>(this.url + '/groceries', {params: params});
  }
}
