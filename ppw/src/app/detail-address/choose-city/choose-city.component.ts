
import { Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';

import { NavParams, ModalController } from '@ionic/angular';

import { ChooseAddressComponent } from '../choose-address/choose-address.component';
import { CityService } from './../../services/city.service';
declare var BMap;
declare var BMapLib;

@Component({
  selector: 'app-choose-city',
  templateUrl: './choose-city.component.html',
  styleUrls: ['./choose-city.component.scss'],
})
export class ChooseCityComponent implements OnInit
{
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

  constructor(
    public navParams: NavParams,
    private cityService: CityService,
    private modalCtrl: ModalController,
    public modalController: ModalController,
  )
  {
    this.hotCityList = [{ name: '深圳' }, { name: '西安' }, { name: '杭州' }, { name: '重庆' }, { name: '上海' }, { name: '北京' }];
    this.rowList = [];
    this.listdata = [];
    this.city = { name: '' };
  }
  ngOnInit()
  {
    if (this.cityService.getAddressData())
    {
      this.city.name = this.cityService.getAddressData().cityName;
    }

    this.getCityData();

  }

  //沟崽子们
  ionViewWillEnter()
  {
    console.log('触发ionViewWillEnter');
  }


  ionViewWillLeave()
  {
    console.log('触发ionViewWillLeave');
  }

  ionViewDidLeave()
  {
    console.log('触发ionViewDidLeave');
  }

  ionViewWillUnload()
  {
    console.log('触发ionViewWillUnload');
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad');

  }

  ionViewDidEnter()
  {
    console.log('ionViewDidEnter');
    let that = this;
    this.cityService.getLocation().then((result: any) =>
    {
      that.locationCity = result.name;
      //使用localStoage存储cityName. 此处不可以使用this.localCityName = cityName; 因为这里的this 指向的是当前的类， 也就是 function(result)这个类
      localStorage.setItem('currentCity', that.locationCity);
      console.log('定位到当前城市', that.locationCity);
    })
    //   let that = this;
    //   var myCity = new BMap.LocalCity();
    //   myCity.get(function (result) {
    //      that.locationCity = result.name; 
    //      //使用localStoage存储cityName. 此处不可以使用this.localCityName = cityName; 因为这里的this 指向的是当前的类， 也就是 function(result)这个类
    //       localStorage.setItem('currentCity', that.locationCity);
    //       console.log('定位到当前城市',that.locationCity);
    //       // alert('定位到当前城市'+ that.locationCity);
    //       return that.locationCity;
    //  });

    //延迟500毫秒取存储在localStorage中的 cityName 
    setTimeout(() =>
    {
      this.locationCity = localStorage.getItem('currentCity');
    }, 500);
  }

  // 热门城市
  getRowListByGridList(size)
  {
    if (this.rowList.length > 1)
    {
      return this.rowList;
    }
    for (let i = 0; i < this.hotCityList.length; i += size)
    {
      const listTemp = [];
      listTemp.push(this.hotCityList.slice(i, i + size));
      this.rowList.push(listTemp);
    }
    return this.rowList;
  }
  getCityData()
  {
    this.cityService.getLocalCityData().subscribe(res =>
    {
      const tempList = res.json();
      // let tempList: Array = Array(tempObj._body);
      for (let i = 0; i < tempList.length; i++)
      {
        if (tempList[i].code > 999 && tempList[i].code < 10000)
        {
          this.listdata.push(tempList[i]);
        }
      }

      console.log('cityData----------------->>', this.listdata);
      // tslint:disable-next-line:no-shadowed-variable
    }, error =>
      {
        console.log(error);
      }
    );
  }
  backWithCity()
  {
    this.navParams.data.modal.dismiss();
  }

  onCurrentCityClick(city: any)
  {
    console.log('当前选择的城市' + city.name);
    // 返回参数
    this.modalCtrl.dismiss({ 'res': city });
    // this.chooseCity(); // 测试 多层 模态
  }

  async chooseCity()
  {
    console.log('选择城市：');
    const modal = await this.modalController.create({
      component: ChooseAddressComponent,
      // componentProps: { value: this.addressData.city }
    });
    await modal.present();
    // 模态返回 数据
    const { data } = await modal.onDidDismiss();
    console.log(data);
    if (data)
    {
      // this.addressData.cityName = data['res'].name;
    }

  }
}
