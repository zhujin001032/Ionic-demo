import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CityService } from './services/city.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({ mode: 'ios' }),
    AppRoutingModule, HttpModule, NgZorroAntdMobileModule, BrowserAnimationsModule, FormsModule, HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
