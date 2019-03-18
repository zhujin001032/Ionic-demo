import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  public addressData = {
    cityCode: 4403,
    districtCode: Number,
    cityName: "深圳",
    districtName: "",
    address: "",
    doorNum: "",
    fullAddress: "",
    lat: Number,
    lng: Number,

  }

  constructor(private httpService: Http) { }

  getNetWorkDataDemo(): Observable<Response> {
    return this.httpService.request('http://jsonplaceholder.typicode.com/users');
  }

  getLocalCityData() {
    return this.httpService.get('assets/json/district.json');
  }

  getAddressData() {
    return this.addressData;
  }

  setAddressData(data) {
    this.addressData = data;
  }
}
