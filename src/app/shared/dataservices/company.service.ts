import { Injectable } from '@angular/core';
import {environment} from '../../../resources/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../dataobjects/page';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getCompanies(params: HttpParams) {
    return this.http.get<Page>(this.url + '/companies', {params: params});
  }
}
