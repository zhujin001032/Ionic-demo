// 1. 子组件引入 Output 和 EventEmitter
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag-address-list',
  templateUrl: './tag-address-list.component.html',
  styleUrls: ['./tag-address-list.component.scss'],
})
export class TagAddressListComponent implements OnInit {
  // 父级传下来的
  @Input() tagData: any;
  // 2.子组件中实例化 EventEmitter 父组件的 事件 outerAddress 初始化
  @Output() outerAddress = new EventEmitter();
  constructor() {

  }

  ngOnInit() {

  }

  onSelectAddress(address) {
    // 3. 子组件通过 EventEmitter 对象 outerAddress 实例广播数据
    this.outerAddress.emit(address);
    console.log('choose address title:', address.title);
  }
}
