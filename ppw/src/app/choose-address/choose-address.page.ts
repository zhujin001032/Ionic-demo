import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.page.html',
  styleUrls: ['./choose-address.page.scss'],
})
export class ChooseAddressPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  backWithAddress() {
    console.log('返回的地址是：');
  }
}
