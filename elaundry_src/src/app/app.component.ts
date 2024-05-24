import { Component,OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {firebase} from '@firebase/app';
import {environment} from '../environments/environment';
import { NotificationsService } from './notifications.service';
import { Router } from '@angular/router';
import { NavExtrasService } from './nav-extras.service';
import { Events } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  isLoggedIn:boolean = false
  isCordova:boolean=false

  async ngOnInit() {
    firebase.initializeApp(environment.firebase);
    await this.notificationsService.init();
  }

  SubCatClickedD(subcat:string){
    this.menuCtrl.close()
    this.events.publish('subcat:clicked',subcat)  
   
  }

  SubCatClicked(cat:string,subcat:string){

    this.go(cat)
    setTimeout(() => {
      this.events.publish('subcat:clicked',subcat)  
    }, 100);
    
    
    console.log("subcatclicked side : "+subcat)
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notificationsService:NotificationsService,
    private router:Router,
    public menuCtrl: MenuController,
    public navStorage:NavExtrasService,
    public events: Events,
    public fcm:FCM,
    private nativeStorage:Storage,
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();

    

    events.subscribe('user:login', () => {
      this.isLoggedIn = true
      this.GetUserFromStorage()
      console.log("subs login")
    });

    events.subscribe('user:logout', () => {
      this.isLoggedIn = false
      console.log("subs logout")
    });

    events.subscribe('menu:close', () => {
      this.menuCtrl.close()
    });

  }

  go(goto:string){
    
    this.menuCtrl.close()
    this.router.navigate([goto]);
    
  }

  menuClosed() {
    console.log("pre menu closed")
    this.events.publish('menu:closed');
    console.log("sent event menu closed")
}

menuOpened() {
  console.log("pre menu opened")
    this.events.publish('menu:opened');
    console.log("sent event menu opened")
}

  initializeApp() {
    
    this.platform.ready().then(() => {
      if(this.platform.is('cordova'))
      {
      this.isCordova = true
      this.splashScreen.hide();  
    //  this.statusBar.overlaysWebView(true); latest commented

      // set status bar to white
     // this.statusBar.backgroundColorByHexString('#000000'); 
     console.log(" app platform ready")
     

      this.fcm.onNotification().subscribe(data => {

        this.localNotifications.schedule({
          id: 1,
          text: data.body,
          data: { secret: 'secret' }
        });

        if (data.wasTapped) {
         // alert("Received in background");
          
        } else {
         // alert("Received in foreground");
        };
  
      });
      }
    });
     
  }

  customer:any;

  GetUserFromStorage(){
    if(this.platform.ready()){
      if(this.platform.is('cordova')){
        this.nativeStorage.get("user")
        .then(
          data => {
            if(data == null || data == undefined || data == "" || data == "undefined"){
             // this.go('login')
            }else{
              this.customer = JSON.parse(data);
            }
          },
          error =>
            console.error(error)
      );
      }
      else
      {

        var data = localStorage.getItem("user");
        console.log("this.customer == " + data);

        if(data != null && data != undefined && data != "" && data != "undefined"){
          this.customer = JSON.parse(data)
          //this.GotCustomer()
        }else{
         // this.go('login')
        }

      } 
     }
  }

  LogoutClicked(){
    this.isLoggedIn = false
    this.SaveInStorage("user","");
    this.SaveInStorage("isLoggedIn","No");
    this.events.publish('user:logout');
    this.go('customer-web')
  }

  ngAfterViewInit() {
    this.platform.ready().then(async () => {
       await this.notificationsService.requestPermission();
    });
    
}

SaveInStorage(item:string,value:string){
  if(this.platform.ready()){
    if(this.platform.is('cordova')){
      this.nativeStorage.set(item,value)
      .then(
        () => console.log(""),
        error => 
        {
          console.log("error in saving")
        }
        
      );
    }else{
    //  this.presentAlert("no save","no cordova")
    localStorage.setItem(item,value)
    console.log( item + ":hello: " + value);
    }
   }
}
}
