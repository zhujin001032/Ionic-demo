
import { AppRoutingModule } from './../app-routing.module';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
// import { Picker } from 'ng-zorro-antd-mobile';
import { ModalController } from '@ionic/angular';
import { ChooseCityComponent } from './choose-city/choose-city.component';
import { PickerController } from '@ionic/angular';
@Component({
  selector: 'app-detail-address',
  templateUrl: './detail-address.page.html',
  styleUrls: ['./detail-address.page.scss'],
  // providers: [Picker]

})
export class DetailAddressPage implements OnInit {
  simpleColumns: { name: string; options: { text: string; value: string; }[]; }[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    public pickerCtrl: PickerController,

  ) {

    this.city = '深圳';
    this.simpleColumns = [
      {
        name: 'col1',
        options: [
          { text: '1', value: '1' },
          { text: '2', value: '2' },
          { text: '3', value: '3' }
        ]
      }, {
        name: 'col2',
        options: [
          { text: '1-1', value: '1-1' },
          { text: '1-2', value: '1-2' },
          { text: '2-1', value: '2-1' },
          { text: '2-2', value: '2-2' },
          { text: '3-1', value: '3-1' }
        ]
      }, {
        name: 'col3',
        options: [
          { text: '1-1-1', value: '1-1-1' },
          { text: '1-1-2', value: '1-1-2' },
          { text: '1-2-1', value: '1-2-1' },
          { text: '1-2-2', value: '1-2-2' },
          { text: '2-1-1', value: '2-1-1' },
          { text: '2-1-2', value: '2-1-2' },
          { text: '2-2-1', value: '2-2-1' },
          { text: '2-2-2', value: '2-2-2' },
          { text: '3-1-1', value: '3-1-1' },
          { text: '3-1-2', value: '3-1-2' }
        ]
      }
    ];
  }
  public city = '';
  public zone = '';
  public detail = '';
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

  async chooseZone() {
    console.log('选择区域：');

    const picker = await this.pickerCtrl.create({
      buttons: [{
        text: '取消', handler: () => {
          console.log('取消!');
        }
      }, {
        text: '确定', handler: (res) => {
          console.log(res.district.text);
        }
      }],
      columns: [
        {
          name: 'district',
          options: [
            {
              text: '南山区',
              value: 1
            },
            {
              text: '宝安区',
              value: 2
            },
            {
              text: '龙华区',
              value: 3
            },
          ]
        },
        {
          name: 'zone',
          options: [
            {
              text: '南油',
              value: 1
            },
            {
              text: '海雅百货',
              value: 1
            },
            {
              text: '南新天桥',
              value: 1
            }
          ]
        },
      ],
    });
    await picker.present();
  }
  chooseDetailAddressFromMap() {
    console.log('选择地址：');
    this.router.navigate(['choose-address']);
  }


}
