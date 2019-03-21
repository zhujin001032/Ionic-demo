import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs';

import { SearchAddressComponent } from './../choose-address/search-address/search-address.component';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  public addressData: any = {
    cityCode: 4403,
    districtCode: Number,
    cityName: '深圳',
    districtName: '',
    address: '',
    doorNum: '',
    fullAddress: '',
    lat: Number,
    lng: Number,

  };

  constructor(private httpService: Http) {
    if (!localStorage.getItem('kAddress')) {
      this.setAddressData(this.addressData);
    }
  }

  getNetWorkDataDemo(): Observable<Response> {
    return this.httpService.request('http://jsonplaceholder.typicode.com/users');
  }

  getLocalCityData() {
    return this.httpService.get('assets/json/district.json');
  }

  searchAddress(region: String, keyWord: string): Observable<Response> {
    const api = 'http://api.map.baidu.com/place/v2/search?query=keyWord&region=region&output=json&ak=OU0ejFYGO1a2EMwLlcBQ7iklFWEyA0io';
    const header = new Headers();
    header.append('Access-Control-Allow-Origin', '*');

    return this.httpService.get(api);
  }
  public getAddressData() {
    this.addressData = JSON.parse(localStorage.getItem('kAddress'));
    return this.addressData;
  }

  public setAddressData(data) {
    // 将数据写入localStorage
    localStorage.setItem('kAddress', JSON.stringify(data));
  }
}


