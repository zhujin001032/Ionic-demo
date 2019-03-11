import { Component } from '@angular/core';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  detailAddress() {
    console.log('click detail address button 1');
    // this.nav.navigateForward("/detail-address");
  }
}
