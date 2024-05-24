import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import{ HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications} from '@ionic-native/local-notifications/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import {Deeplinks} from '@ionic-native/deeplinks/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule
    ,HttpClientModule ,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAFlY-p9MFgxSwYqAevGCH36VKFvqBlFQU',
      libraries: ['drawing']
    })
  ],
  providers: [
    DatePipe,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    FCM,
    LocalNotifications,
    Geolocation,
    Deeplinks
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
