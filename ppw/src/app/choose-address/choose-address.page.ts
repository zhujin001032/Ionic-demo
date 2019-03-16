import { TagAddressListComponent } from './tag-address-list/tag-address-list.component';
import { SearchAddressComponent } from './search-address/search-address.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController, NavController } from '@ionic/angular';


declare var AMap;
declare var BMap;

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.page.html',
  styleUrls: ['./choose-address.page.scss'],
})
export class ChooseAddressPage implements OnInit {
  @ViewChild('map_container') map_container: ElementRef;
  mapId: any;  // 
  map: any;    // 地图
  tagData: any;
  dataPoint: any;     // 初始的point
  address: any;    // 地址
  clicked: boolean = false;    // 是否已经点击过地图
  districts: any = [{ label: '请选择', code: 0 }];   // 区域
  tradArea: any = [{ label: '请选择', code: 0 }];    // 片区
  selectTradArea: any = { label: '请选择', code: 0 };    // 选中的片区
  selectCity: any = { label: '请选择', code: 0 };    // 选中的城市
  selectDistrict: any = { label: '请选择', code: 0 };    // 选中的区域
  constructor(
    private location: Location,
    public modalController: ModalController,
    private navController: NavController
  ) {
    this.mapId = 'mapId' + new Date().getTime();
  }
  // 自定义事件
  selectAddress(address) {
    alert('father' + address.title);
  }
  ngOnInit() {
    this.clicked = false;
    this.dataPoint = { lng: 113.9243750297165, lat: 22.512403862481392 };
    ;
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
    console.log('返回的');
    // this.location.back();
    this.navController.back();
  }

  async showModel() {
    console.log('>>>>>>>>>>>>>>>>>>> present page');
    const modal = await this.modalController.create({
      component: SearchAddressComponent,
      componentProps: { value: '来福士' }
    });

    await modal.present();
  }

  //百度地图
  ngAfterViewInit() {
    let that = this;
    setTimeout(function () {
      that.showMap(that.dataPoint);
    }, 100);
  }

  showMap(poi) {
    let map = new BMap.Map(this.mapId);
    this.map = map;
    // let pointcode = {lng: 116.404, lat: 39.915};
    let pointCode = poi;
    map.addEventListener('touchend', e => {
      this.clicked = true;
      pointCode = {
        lng: e.point.lng,
        lat: e.point.lat
      }
      let point = new BMap.Point(pointCode.lng, pointCode.lat);
      //清除之前标注
      map.clearOverlays();
      let marker = new BMap.Marker(point);
      map.addOverlay(marker);
      this.pointToAddress(point);
      console.log(e.point.lng + ", " + e.point.lat);
      //this.data.point = pointCode;
    })


    let point = new BMap.Point(pointCode.lng, pointCode.lat);
    let marker = new BMap.Marker(point);
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
    let that = this;
    let geo = new BMap.Geocoder();
    geo.getLocation(point, function (obj) {
      that.address = obj.addressComponents.street + obj.addressComponents.streetNumber;
      console.log(obj.surroundingPois, '----------------------obj')
      //that.data.address = that.address;
      that.tagData = obj.surroundingPois;
    });
  }

  refreshMapList(data: any) {

    console.log(data);


  }

  changeAddress() {
    if (!this.clicked) {
      let keyword = this.selectCity.name + this.selectDistrict.name + this.selectTradArea.name + this.address;
      console.log(keyword);
      //this.addressToPoint(keyword);
      //this.data.address = this.address;
    }
  }


  doSomething(obj) {


  }


  // ionViewDidEnter() {
  //   this.map = new AMap.Map(this.map_container.nativeElement, {
  //     view: new AMap.View2D({// 创建地图二维视口
  //       zoom: 11, // 设置地图缩放级别
  //       rotateEnable: true,
  //       showBuildingBlock: true,
  //       resizeEnable: true
  //     }),

  //   });
  //   this.map.plugin('AMap.Geolocation', function () {
  //     const geolocation = new AMap.Geolocation({
  //       // 是否使用高精度定位，默认：true
  //       enableHighAccuracy: true,
  //       // 设置定位超时时间，默认：无穷大
  //       timeout: 10000,
  //       // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
  //       buttonOffset: new AMap.Pixel(10, 20),
  //       //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
  //       zoomToAccuracy: true,
  //       //  定位按钮的排放位置,  RB表示右下
  //       buttonPosition: 'RB',
  //       showMarker: true,
  //       showButton: true,
  //       panToLocation: true,

  //     });

  //     geolocation.getCurrentPosition();
  //     AMap.event.addListener(geolocation, 'complete', onComplete);
  //     AMap.event.addListener(geolocation, 'error', onError);

  //     function onComplete(data) {
  //       // data是具体的定位信息
  //       console.log(data);

  //     }

  //     function onError(data) {
  //       // 定位出错
  //     }
  //   });
  // }


}
