import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

import { Observable, observable } from 'rxjs';
declare var BMap;
@Injectable({
  providedIn: 'root'
})
export class CityService
{

  headers: any;
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

  constructor(private httpService: Http, public httpJsp: HttpClient, private geolocation: Geolocation)
  {
    if (!localStorage.getItem('kAddress'))
    {
      this.setAddressData(this.addressData);
    }
  }

  public getLocation(): Promise<Geoposition>
  {

    // let watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //  // data can be a set of coordinates, or an error (if an error occurred).
    //  // data.coords.latitude
    //  // data.coords.longitude
    //  if (!isError(data)){
    //    console.log('get watchPosition', data.coords.longitude --- data.coords.latitude);
    //  }
    // });

    return new Promise((resolve, reject) =>
    {
      // 插件原生方法对 andriod 网页 无效 google
      // this.geolocation.getCurrentPosition().then((resp) => {
      //   console.log('get location', resp.coords.longitude --- resp.coords.latitude);
      //   resolve(resp);

      //  }).catch((error) => {
      //    console.log('Error getting location', error);
      //  });

      //       var geolocation = new BMap.Geolocation();
      //       geolocation.getCurrentPosition(function(r){
      // 	    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      // 		    var mk = new BMap.Marker(r.point);
      // 		    // map.addOverlay(mk);
      // 		    // map.panTo(r.point);
      //         console.log('您的位置：'+r.point.lng+','+r.point.lat);
      // 	}
      // 	else {
      // 		alert('failed'+this.getStatus());
      // 	}
      // });

      //
      const that = this;
      var myCity = new BMap.LocalCity(); // IP定位
      myCity.get(function (result)
      {

        console.log('定位到当前城市', result.name);
        resolve(result);
        // alert('定位到当前城市'+ that.locationCity);
        // return result.name;
      });
    });

  }
  getNetWorkDataDemo(): Observable<Response>
  {
    return this.httpService.request('http://jsonplaceholder.typicode.com/users');
  }

  getLocalCityData()
  {
    return this.httpService.get('assets/json/district.json');
  }


  searchAddress(region: String, keyWord: string)
  {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });
    // tslint:disable-next-line:max-line-length
    const api = 'http://api.map.baidu.com/place/v2/search?query=' + keyWord + '&region=' + region + '&output=json&ak=OU0ejFYGO1a2EMwLlcBQ7iklFWEyA0io';
    return this.httpService.get(api, { headers: this.headers });
    // return new Promise((resolve, reject) =>
    // {

    //   this.httpJsp.jsonp(api, 'callback').subscribe(response =>
    //   {
    //     console.log(response);
    //     resolve(response);
    //   });
    // });


  }

  public getAddressData()
  {
    this.addressData = JSON.parse(localStorage.getItem('kAddress'));
    return this.addressData;
  }

  public setAddressData(data)
  {
    // 将数据写入localStorage
    localStorage.setItem('kAddress', JSON.stringify(data));
  }
}


