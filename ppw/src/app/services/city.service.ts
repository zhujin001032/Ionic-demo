import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpService: Http) { }

  getNetWorkDataDemo(): Observable<Response> {
    return this.httpService.request('http://jsonplaceholder.typicode.com/users');
  }

  getLocalCityData() {
    return this.httpService.get('assets/json/district.json');
  }
}
