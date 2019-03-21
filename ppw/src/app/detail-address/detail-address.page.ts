import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { PickerController } from '@ionic/angular';

import { fromEventPattern, from, config } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Picker } from 'ng-zorro-antd-mobile';

import { CityService } from './../services/city.service';

import { ChooseCityComponent } from './choose-city/choose-city.component';
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
  public addressData: any;
  // public city = '';
  // public detail = '';
  // public doorNum = '';
  // zoneStr = '请选择';
  value = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    public pickerCtrl: PickerController,
    public cityService: CityService,
  ) {
    this.addressData = this.cityService.getAddressData();
    // if (this.cityService.getAddressData().cityName) {
    //   this.city = this.cityService.getAddressData().cityName;
    // }
    // if (this.cityService.getAddressData().address) {
    //   this.detail = this.cityService.getAddressData().address;
    // }
    // if (this.cityService.getAddressData().districtName) {
    //   this.zoneStr = this.cityService.getAddressData().districtName;
    // }
    // if (this.cityService.getAddressData().doorNum) {
    //   this.doorNum = this.cityService.getAddressData().doorNum;
    // }
  }

  checkZone(result) {
    this.addressData.districtName = this.getResult(result);
    console.log('----------------' + this.addressData.districtName);
    // this.saveAddress();
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

  ngOnInit() {

  }
  sureAddress() {
    this.saveAddress();
    console.log('地址是：', this.addressData);

  }

  async chooseCity() {
    console.log('选择城市：');
    const modal = await this.modalController.create({
      component: ChooseCityComponent,
      componentProps: { value: this.addressData.city }
    });
    await modal.present();
    // 模态返回 数据
    const { data } = await modal.onDidDismiss();
    console.log(data);
    if (data) {
      this.addressData.city = data['res'].name;
      // this.saveAddress();
    }

  }

  onchange() {
    console.log('change doorNum', this.addressData.doorNum);
    // this.saveAddress();
  }
  onDismiss1() {
    console.log('cancel');
  }

  chooseDetailAddressFromMap() {
    console.log('push 选择地址：');
    this.router.navigate(['choose-address']);
  }

  saveAddress() {
    this.cityService.setAddressData(this.addressData);
  }
}
