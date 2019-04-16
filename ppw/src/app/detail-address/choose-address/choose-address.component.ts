
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

import { ModalController, NavController } from '@ionic/angular';

import { CityService } from '../../services/city.service';
import { TagAddressListComponent } from './../choose-address/tag-address-list/tag-address-list.component';

declare var BMap;

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.scss'],
})
export class ChooseAddressComponent implements OnInit
{

  public mapId: any;
  public keyWord = '';
  public cityName = '深圳';
  public addressList = [];
  public addressData: any;
  @ViewChild('searchBar') searchBar: ElementRef;
  @ViewChild('resBg') resBg: ElementRef;

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

  )
  {
    this.mapId = 'mapId' + new Date().getTime();
  }

  // 5.父组件接收到数据会调用自己的  方法，这个时候就能拿到子组件的数据
  selectAddress(addressObj)
  {
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
  ngOnInit()
  {
    this.clicked = false;
    this.dataPoint = { lng: 113.9243750297165, lat: 22.512403862481392 };
    this.addressData = this.cityService.getAddressData();
  }

  keydown()
  {
    console.log(this.keyWord);
    // this.searchMap();
    this.cityService.searchAddress('深圳', this.keyWord).subscribe((res =>
    {
      console.log(res);
    }));
    if (this.keyWord.length === 0)
    {
      this.addressList = [];
    } else
    {
    }
  }


  scroll()
  {
    // console.log("打印log日志");实时看下效果
    console.log('开始滚动！');
    // this.searchBar.ion - input.blur();

  }
  getUserLocation()
  {
    let that = this;
    this.cityService.getLocation().then((result: any) =>
    {
      console.log('定位到当前城市', result.name, '坐标', result.center);
      that.showMap(result.center);
      // TODO:
      that.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);


    })
  }


  // 搜索地址
  searchMap()
  {
    const that = this;
    if (this.keyWord === '')
    {

      setTimeout(function ()
      {
        that.showMap(that.dataPoint);
      }, 100);
      return;
    }


    // 先清除标注
    that.map.clearOverlays();
    const local = new BMap.LocalSearch(this.map, {
      renderOptions: { map: this.map },
      onSearchComplete: refreshList
    });

    function refreshList()
    {
      if (local.getResults() !== undefined)
      {
        that.map.clearOverlays(); // 清除地图上所有覆盖物
        if (local.getResults().Lq !== undefined)
        {
          that.addressList = local.getResults().Lq;
          console.log(that.addressList);
        }
      }
    }
    local.search(this.keyWord);
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
  backWithAddress()
  {
    this.modalController.dismiss();
  }
  // 百度地图
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit()
  {
    const that = this;
    setTimeout(function ()
    {
      that.showMap(that.dataPoint);
    }, 100);
  }


  showMap(poi)
  {
    const map = new BMap.Map(this.mapId);
    map.addControl(new BMap.GeolocationControl('BMAP_ANCHOR_TOP_RIGHT'));


    this.map = map;
    // let pointcode = {lng: 116.404, lat: 39.915};
    let pointCode = poi;
    map.addEventListener('touchend', e =>
    {
      this.clicked = true;
      pointCode = {
        lng: e.point.lng,
        lat: e.point.lat
      };
      const touchPoint = new BMap.Point(pointCode.lng, pointCode.lat);
      // 清除之前标注
      map.clearOverlays();
      const newMarker = new BMap.Marker(touchPoint);
      map.addOverlay(marker);
      this.pointToAddress(point);
      // this.data.point = pointCode;
    });


    const point = new BMap.Point(pointCode.lng, pointCode.lat);
    const marker = new BMap.Marker(point);
    map.centerAndZoom(point, 18);
    map.enableScrollWheelZoom(true);
    map.enableContinuousZoom(); // 连续缩放效果，默认禁用
    if (this.clicked)
    {
      map.addOverlay(marker);
      console.log('addOverlay\n');
    }

  }


  // 将经纬度解析成地址
  pointToAddress(point)
  {
    const that = this;
    const geo = new BMap.Geocoder();
    geo.getLocation(point, function (obj)
    {
      that.address = obj.addressComponents.street + obj.addressComponents.streetNumber;
      console.log('当前经纬度：', obj.surroundingPois);
      that.tagData = obj.surroundingPois;
    });
  }

  refreshMapList(data: any)
  {
    console.log(data);
  }

  // changeAddress() {
  //   if (!this.clicked) {
  //     const keyword = this.selectCity.name + this.selectDistrict.name + this.selectTradArea.name + this.address;
  //     console.log(keyword);
  //     // this.addressToPoint(keyword);
  //     // this.data.address = this.address;
  //   }
  // }

  selectAddres(addressData)
  {
    this.modalController.dismiss({ 'res': addressData });
  }

  doSomething(obj)
  {


  }

}
