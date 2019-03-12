import { ChooseCityComponent } from './choose-city/choose-city.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DetailAddressPage } from './detail-address.page';

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
  ],
  entryComponents: [ChooseCityComponent],
  declarations: [DetailAddressPage, ChooseCityComponent]
})

export class DetailAddressPageModule {
}
