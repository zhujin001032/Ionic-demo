import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-choose-city',
  templateUrl: './choose-city.component.html',
  styleUrls: ['./choose-city.component.scss'],
})
export class ChooseCityComponent implements OnInit {

  constructor(public navParams: NavParams) {
    console.log('上一次的城市数据是' + navParams.data['cityData']);
  }

  ngOnInit() { }

  backWithCity() {
    this.navParams.data.modal.dismiss();
  }

}
