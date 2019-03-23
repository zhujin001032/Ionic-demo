
import { Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';

import { NavParams, ModalController } from '@ionic/angular';

import { CityService } from './../../services/city.service';

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
    {
		"code": 15020418,
		"name": "自由路",
		"status": 1,
		"pinyin": "",
		"py": "btzyl",
		"city_no": "99",
		"order_num": 99
	},
   * */
  locationCity: any;
  city: any;
  listdata: any;
  hotCityList: any;
  rowList: any;

  constructor(public navParams: NavParams, private cityService: CityService, private modalCtrl: ModalController, ) {
    this.hotCityList = [{ name: '深圳' }, { name: '西安' }, { name: '杭州' }, { name: '重庆' }, { name: '上海' }, { name: '北京' }];
    this.rowList = [];
    this.listdata = [];
    this.city = { name: '' };
  }
  ngOnInit() {
    if (this.cityService.getAddressData()) {
      this.city.name = this.cityService.getAddressData().cityName;
    }

    this.getCityData();

  }

  onItemClick(item) {
    console.log(item);
  }

  ionViewDidEnter() {
  }

  // 热门城市
  getRowListByGridList(size) {
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
      const tempList = res.json();
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

  onCurrentCityClick(city: any) {
    console.log('当前选择的城市' + city.name);
    // 返回参数
    this.modalCtrl.dismiss({ 'res': city });
  }
}
