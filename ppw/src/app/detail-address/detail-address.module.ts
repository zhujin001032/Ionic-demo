import { ChooseAddressComponent } from './choose-address/choose-address.component';
import { TagAddressListComponent } from './choose-address/tag-address-list/tag-address-list.component';

import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { ChooseCityComponent } from './choose-city/choose-city.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DetailAddressPage } from './detail-address.page';
import { FilterPipe } from '../filter.pipe';
const routes: Routes = [
  {
    path: '',
    component: DetailAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgZorroAntdMobileModule,
  ],
  entryComponents: [DetailAddressPage, ChooseCityComponent, ChooseAddressComponent],
  declarations: [DetailAddressPage, ChooseCityComponent, ChooseAddressComponent, FilterPipe, TagAddressListComponent]

})

export class DetailAddressPageModule {
}
