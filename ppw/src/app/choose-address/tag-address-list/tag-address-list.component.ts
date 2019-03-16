import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-tag-address-list',
  templateUrl: './tag-address-list.component.html',
  styleUrls: ['./tag-address-list.component.scss'],
})
export class TagAddressListComponent implements OnInit {
  //父级传下来的
  @Input() tagData: any;
  //父组件的 事件 onAddress 初始化
  // @Output() onAddress;
  constructor() {

  }

  ngOnInit() {
    // this.onAddress = new EventEmitter();
  }

  onSelectAddress(address) {
    // this.onAddress.emit(address);
    console.log('choose address:', address.title);
  }
}
