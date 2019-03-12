import { SearchAddressComponent } from './search-address/search-address.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';

declare var AMap;

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.page.html',
  styleUrls: ['./choose-address.page.scss'],
})
export class ChooseAddressPage implements OnInit {
  @ViewChild('map_container') map_container: ElementRef;
  map: any; // 地图对象

  constructor(
    private location: Location,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }
  backWithAddress() {
    console.log('返回的地址是：');
    this.location.back();

  }

  async showModel() {
    const modal = await this.modalController.create({
      component: SearchAddressComponent,
      componentProps: { value: '来福士' }
    });
    await modal.present();
  }
  ionViewDidEnter() {
    this.map = new AMap.Map(this.map_container.nativeElement, {
      view: new AMap.View2D({// 创建地图二维视口
        zoom: 11, // 设置地图缩放级别
        rotateEnable: true,
        showBuildingBlock: true,
        resizeEnable: true
      }),

    });
    this.map.plugin('AMap.Geolocation', function () {
      const geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB',
        showMarker: true,
        showButton: true,
        panToLocation: true,

      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', onComplete);
      AMap.event.addListener(geolocation, 'error', onError);

      function onComplete(data) {
        // data是具体的定位信息
        console.log(data);

      }

      function onError(data) {
        // 定位出错
      }
    });
  }


}
