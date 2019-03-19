
import { CityService } from './../../services/city.service';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-choose-city',
  templateUrl: './choose-city.component.html',
  styleUrls: ['./choose-city.component.scss'],
})
export class ChooseCityComponent implements OnInit {
  // 城市数据
  /**
   * 当前定位城市
    当前开启定位权限时，显示定位到的城市
    当前未开启定位权限但已选择过城市时，显示已选择的城市
    当前未开启定位权限且未选择过城市时，显示“深圳”
   * */
  city: any;
  listdata: any;
  hotCityList: any;
  rowList: any;
  // 
  constructor(public navParams: NavParams, private cityService: CityService) {
    this.hotCityList = [{ name: '深圳' }, { name: '西安' }, { name: '杭州' }, { name: '重庆' }, { name: '上海' }, { name: '北京' }];
    this.rowList = [];
    this.listdata = [];
  }
  ngOnInit() {
    this.city = this.cityService.getAddressData
    console.log('城市数据个数==============' + this.hotCityList.length);
    this.getCityData();

  }

  onItemClick(item) {
    console.log(item);
  }

  ionViewDidEnter() {
  }
  // size: 一行分为size列  原理  : 假设size=2，则【1,2,3,4,5,6,7,8,9】=>【1，2】,【3,4】,【5，6】，【7，8】，【9】
  getRowListByGridList(size) {
    console.log('城市数据个数==============1111' + this.hotCityList.length);
    if (this.rowList.length > 1) {
      return this.rowList;
    }
    for (let i = 0; i < this.hotCityList.length; i += size) {
      const listTemp = [];
      listTemp.push(this.hotCityList.slice(i, i + size));
      this.rowList.push(listTemp);
    }
    return this.rowList;
  }
  getCityData() {
    this.cityService.getLocalCityData().subscribe(res => {
      let tempList = res.json();
      // let tempList: Array = Array(tempObj._body);
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].code > 999 && tempList[i].code < 10000) {
          this.listdata.push(tempList[i]);
        }

      }

      console.log('cityData----------------->>', this.listdata);
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);
    }
    );
  }
  backWithCity() {
    this.navParams.data.modal.dismiss();
  }

  onCurrentCityClick(city) {

  }
}
