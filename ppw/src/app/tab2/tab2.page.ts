import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CallNumber } from '@ionic-native/call-number/ngx';

import { Picker } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [Picker],
})
export class Tab2Page
{
  public singleArea = ["hhh", "hksahjks", "gjasgh"];
  // [{ label: '深圳市', code: '4403', children: [{ label: '南山区', code: '440301' }, { label: '南油', code: '440302' }] },
  // { label: '北京市', code: '11', children: [{ label: '海定区', code: '1101' }, { label: '崇文区', code: '1102' }] }];

  // public value1 = [{ label: '深圳市', code: '4403', children: [{ label: '南山区', code: '440301' }, { label: '南油', code: '440302' }] },
  // { label: '北京市', code: '11', children: [{ label: '海定区', code: '1101' }, { label: '崇文区', code: '1102' }] }];
  name1 = '请选择';
  value = [];
  name = '请选择';

  users: any[] = [
    {
      id: 1,
      first: 'HE',
      last: 'Jason',
    },
    {
      id: 2,
      first: 'HE',
      last: 'King',
    },
    {
      id: 3,
      first: 'H额、',
      last: 'zhujin',
    }
  ]


  compareWithFn = (o1, o2) =>
  {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;

  constructor(private callNumber: CallNumber)
  {

  }
  ngOnInit()
  {
    const formbuilder = new FormBuilder();

  }
  onOk1(result)
  {
    this.name1 = this.getResult(result);
    console.log('----------------' + this.name1);
  }
  onDismiss1()
  {
    console.log('cancel');
  }
  getResult(result)
  {
    this.value = [];
    let temp = '';
    result.forEach(item =>
    {
      this.value.push(item.label || item);
      temp += item.label || item;
    });
    return this.value.map(v => v).join(',');
  }

  callPhone()
  {
    this.callNumber.callNumber('18001010101', true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  getValue(result)
  {
    const value = [];
    let temp = '';
    result.forEach(item =>
    {
      value.push(item.value || item);
      temp += item.value || item;
    });
    return value;
  }
  detailAddress()
  {
    console.log('click detail address button 1');
    // this.nav.navigateForward("/detail-address");
  }
}
