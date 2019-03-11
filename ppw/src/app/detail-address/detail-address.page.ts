
import { AppRoutingModule } from './../app-routing.module';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-detail-address',
  templateUrl: './detail-address.page.html',
  styleUrls: ['./detail-address.page.scss']
})
export class DetailAddressPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private service: HeroService
  ) {

    this.city = '深圳';
  }
  public city = '';
  public zone = '';
  public detail = '';

  ngOnInit() { }
  sureAddress() {
    console.log('地址是：');
  }
  chooseCity() {
    console.log('选择城市：');

  }
  chooseZone() {
    console.log('选择区域：');
  }
  chooseDetailAddressFromMap() {
    console.log('选择地址：');
    this.router.navigate(['choose-address']);
  }
}
