import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { CityService } from './../../services/city.service';
@Component({
  selector: 'app-search-address',
  templateUrl: './search-address.component.html',
  styleUrls: ['./search-address.component.scss'],
})
export class SearchAddressComponent implements OnInit {
  public keyWord = '';
  public cityName = '深圳';
  public addressList = [];

  // 解析传递的参数
  constructor(public navParams: NavParams, public cityService: CityService) {
    this.keyWord = navParams.data['value'];
  }
  keydown() {
    console.log(this.keyWord);
    this.cityService.searchAddress(this.cityName, this.keyWord).subscribe((res) => {
      console.log(res.json);
    });
  }
  demoData() {

    for (let i = 0; i < 10; i++) {
      const addressItem = new AddressItem('南油大厦', '这是详细地址' + i);
      this.addressList.push(addressItem);
    }
  }

  ngOnInit() {
    // this.demoData();
  }

  async closeSearchPage() {
    this.navParams.data.modal.dismiss();
  }

}
class AddressItem {
  constructor(public title, public address) { }
}
