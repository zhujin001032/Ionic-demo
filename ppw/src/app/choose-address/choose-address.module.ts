import { TagAddressListComponent } from './../choose-address/tag-address-list/tag-address-list.component';
import { SearchAddressComponent } from './search-address/search-address.component';
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
  declarations: [ChooseAddressPage, SearchAddressComponent, TagAddressListComponent],
  entryComponents: [SearchAddressComponent]

})
export class ChooseAddressPageModule { }
