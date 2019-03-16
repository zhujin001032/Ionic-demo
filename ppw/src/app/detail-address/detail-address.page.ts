import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ChooseCityComponent } from './choose-city/choose-city.component';
import { PickerController } from '@ionic/angular';
// 级联picker
import { Picker } from 'ng-zorro-antd-mobile';

import { fromEventPattern, from, config } from 'rxjs';
@Component({
  selector: 'app-detail-address',
  templateUrl: './detail-address.page.html',
  styleUrls: ['./detail-address.page.scss'],
  providers: [Picker]

})
export class DetailAddressPage implements OnInit {

  public zoneList = [
    {
      label: '深圳市', code: '4403',
      children: [
        { label: '南山区', code: '440301' },
        { label: '南油', code: '440302' }
      ]
    },
    {
      label: '北京市', code: '11',
      children: [
        { label: '海定区', code: '1101' },
        { label: '崇文区', code: '1102' }
      ]
    },
    {
      label: '上海', code: '12',
      children: [
        { label: '海定区1', code: '1101' },
        { label: '崇文区2', code: '1102' },
        { label: '海定区3', code: '1101' },
        { label: '崇文区4', code: '1102' },
        { label: '海定区5', code: '1101' },
        { label: '崇文区6', code: '1102' }
      ]
    }
    , {
      label: '天津', code: '13',
      children: [
        { label: '天津区1', code: '1101' },
        { label: '天津区2', code: '1102' },
        { label: '天津区3', code: '1101' },
        { label: '天津区4', code: '1102' },
        { label: '天津区5', code: '1101' },
        { label: '天津区6', code: '1102' },
        { label: '天津区7', code: '1101' },
        { label: '天津区8', code: '1102' }
      ]
    }
  ];

  public valueList = [];

  simpleColumns: { name: string; options: { text: string; value: string; }[]; }[];

  public city = '';
  public zone = '';
  public detail = '';
  zoneStr = '请选择';
  value = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    public pickerCtrl: PickerController,
  ) {

    this.city = '深圳';
  }

  checkZone(result) {
    this.zoneStr = this.getResult(result);
    console.log('----------------' + this.zoneStr);
  }

  getResult(result) {
    this.value = [];
    let temp = '';
    result.forEach(item => {
      this.value.push(item.label || item);
      temp += item.label || item;
    });
    return this.value.map(v => v).join(',');
  }


  getValue(result) {
    const value = [];
    let temp = '';
    result.forEach(item => {
      value.push(item.value || item);
      temp += item.value || item;
    });
    return value;
  }
  ngOnInit() { }
  sureAddress() {
    console.log('地址是：');
  }

  async chooseCity() {
    console.log('选择城市：');
    const modal = await this.modalController.create({
      component: ChooseCityComponent,
      componentProps: { value: '来福士' }
    });
    await modal.present();

  }

  onDismiss1() {
    console.log('cancel');
  }

  chooseDetailAddressFromMap() {
    console.log('选择地址：');
    this.router.navigate(['choose-address']);
  }


}
