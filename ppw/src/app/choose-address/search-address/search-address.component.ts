import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-search-address',
  templateUrl: './search-address.component.html',
  styleUrls: ['./search-address.component.scss'],
})
export class SearchAddressComponent implements OnInit {
  public keyWord = '';
  public addressList = [];

  // 解析传递的参数
  constructor(public navParams: NavParams) {
    this.keyWord = navParams.data['value'];
  }

  demoData() {

    for (let i = 0; i < 10; i++) {
      const addressItem = new AddressItem('南油大厦', '这是详细地址' + i);
      this.addressList.push(addressItem);
    }
  }

  ngOnInit() {
    this.demoData();
  }

  async closeSearchPage() {
    this.navParams.data.modal.dismiss();
  }

}
class AddressItem {
  constructor(public title, public address) { }
}
