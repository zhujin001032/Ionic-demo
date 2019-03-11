import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChooseAddressPage } from './choose-address.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [ChooseAddressPage],
  declarations: [ChooseAddressPage]
})
export class ChooseAddressPageModule { }
