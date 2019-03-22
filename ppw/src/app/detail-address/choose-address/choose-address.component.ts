
import { TagAddressListComponent } from './../choose-address/tag-address-list/tag-address-list.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController, NavController } from '@ionic/angular';

import { CityService } from '../../services/city.service';

declare var AMap;
declare var BMap;

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.scss'],
})
export class ChooseAddressComponent implements OnInit {

  @ViewChild('map_container') map_container: ElementRef;
  public keyWord = '';
  public cityName = '深圳';
  public addressList = [];
  public addressData: any;
  mapId: any;  //
  map: any;    // 地图
  tagData: any;
  dataPoint: any;     // 初始的point
  address: any;    // 地址
  clicked = false;    // 是否已经点击过地图
  districts: any = [{ label: '请选择', code: 0 }];   // 区域
  tradArea: any = [{ label: '请选择', code: 0 }];    // 片区
  selectTradArea: any = { label: '请选择', code: 0 };    // 选中的片区
  selectCity: any = { label: '请选择', code: 0 };    // 选中的城市
  selectDistrict: any = { label: '请选择', code: 0 };    // 选中的区域

  constructor(
    private location: Location,
    public modalController: ModalController,
    private navController: NavController,
    public cityService: CityService,

  ) {
    this.mapId = 'mapId' + new Date().getTime();
  }

  // 5.父组件接收到数据会调用自己的  方法，这个时候就能拿到子组件的数据
  selectAddress(addressObj) {
    /**
     *  DE: ["房地产"]
        Ei: "房地产"
        address: "南山区中心城11号地块，愉福路"
        city: "深圳市"
        phoneNumber: null
        point: J {lng: 113.924524, lat: 22.512542}
        postcode: null
        title: "福园小区"
        type: 0
        uid: "fa7da3e89345e66242d63e4b"
        __proto__: Object
     * 
    */
    // 需要更新对于的code
    this.addressData.address = addressObj.address;
    this.addressData.cityName = addressObj.city;
    this.addressData.lat = addressObj.point.lat;
    this.addressData.lng = addressObj.point.lng;
    console.log('tag-address.component子组件传回来的address', addressObj);
    this.modalController.dismiss({ 'res': this.addressData });
  }
  ngOnInit() {
    this.clicked = false;
    this.dataPoint = { lng: 113.9243750297165, lat: 22.512403862481392 };
    this.addressData = this.cityService.getAddressData();
  }

  keydown() {
    console.log(this.keyWord);
    // this.cityService.searchAddress(this.keyWord, this.cityName).subscribe((res) => {
    //   console.log(res.json);
    // });
  }
  /* 百度解析的结构
{
DE: ["房地产"]
Ei: "房地产"
address: "南山区中心城11号地块，愉福路"
city: "深圳市"
phoneNumber: null
point: J
lat: 22.512542
lng: 113.924524
__proto__: Object
postcode: null
title: "福园小区"
type: 0
uid: "fa7da3e89345e66242d63e4b"
}
*/
  backWithAddress() {
    this.modalController.dismiss();
  }
  // 百度地图
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    const that = this;
    setTimeout(function () {
      that.showMap(that.dataPoint);
    }, 100);
  }

  showMap(poi) {
    const map = new BMap.Map(this.mapId);
    this.map = map;
    // let pointcode = {lng: 116.404, lat: 39.915};
    let pointCode = poi;
    map.addEventListener('touchend', e => {
      this.clicked = true;
      pointCode = {
        lng: e.point.lng,
        lat: e.point.lat
      };
      const point = new BMap.Point(pointCode.lng, pointCode.lat);
      // 清除之前标注
      map.clearOverlays();
      const marker = new BMap.Marker(point);
      map.addOverlay(marker);
      this.pointToAddress(point);
      console.log(e.point.lng + ', ' + e.point.lat);
      // this.data.point = pointCode;
    });


    const point = new BMap.Point(pointCode.lng, pointCode.lat);
    const marker = new BMap.Marker(point);
    map.centerAndZoom(point, 18);
    map.enableScrollWheelZoom(true);
    map.enableContinuousZoom(); // 连续缩放效果，默认禁用
    if (this.clicked) {
      map.addOverlay(marker);
      console.log('addOverlay\n');
    }

  }


  // 将经纬度解析成地址
  pointToAddress(point) {
    const that = this;
    const geo = new BMap.Geocoder();
    geo.getLocation(point, function (obj) {
      that.address = obj.addressComponents.street + obj.addressComponents.streetNumber;
      console.log(obj.surroundingPois, '----------------------obj');
      // that.data.address = that.address;
      that.tagData = obj.surroundingPois;
    });
  }

  refreshMapList(data: any) {
    console.log(data);
  }

  changeAddress() {
    if (!this.clicked) {
      const keyword = this.selectCity.name + this.selectDistrict.name + this.selectTradArea.name + this.address;
      console.log(keyword);
      // this.addressToPoint(keyword);
      // this.data.address = this.address;
    }
  }


  doSomething(obj) {


  }

}
