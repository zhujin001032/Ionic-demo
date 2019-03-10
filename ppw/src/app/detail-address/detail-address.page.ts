import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-detail-address",
  templateUrl: "./detail-address.page.html",
  styleUrls: ["./detail-address.page.scss"]
})
export class DetailAddressPage implements OnInit {
  constructor() {
    this.city="默认深圳默认深圳默认深圳默认深圳";
  }
  public city: string = "";

  ngOnInit() {}
  sureAddress() {
    console.log("地址是：");
  }
  chooseCity() {
    console.log("选择城市：");
  }
  chooseZone() {
    console.log("选择区域：");
  }
  chooseDetailAddress() {
    console.log("选择区域：");
  }
}
