import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../User';
import { AlertController, Platform, Events, MenuController } from '@ionic/angular';
import { TestServiceService } from '../service/test-service.service';
import { Storage } from '@ionic/storage';

import { FCM } from '@ionic-native/fcm/ngx';
import { WindowService } from '../window.service';
import * as firebase from 'firebase';

import { LocalNotifications} from '@ionic-native/local-notifications/ngx'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  windowRef: any;
  pushes: any = [];
 
  password:string="";
  mobileNumber:string="";
  fcmtoken:string=""
  userType="residential"
  isLoading:boolean=false

  user:User;

  isMenuOpen:boolean=false
  subscription:Subscription;

  ionViewDidEnter(){
    this.menu.enable(true, 'customer-menu');
    this.menu.enable(false, 'delivery-menu');
    this.menu.enable(false, 'vendor-menu');
    this.menu.enable(false, 'admin-menu');
  }

  constructor(private router:Router,public alertCtrl: AlertController, private alertController:AlertController,
    public service:TestServiceService,public windowR:WindowService,public events: Events,private menu:MenuController,
                  public platform:Platform,public nativeStorage:Storage,
                  private fcm: FCM, public plt: Platform) { 
    this.user = new User();
    events.subscribe('menu:opened', () => {
      this.isMenuOpen = true
      console.log("got event menu open")
  });
  
  events.subscribe('menu:closed', () => {
      this.isMenuOpen = false
      console.log("got event menu closed")
  });

  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

  ionViewWillEnter(){
 //   this.isExit=false
   this.subscription = this.platform.backButton.subscribeWithPriority(10000,
     () => {
       console.log("didenter back")
       if(this.isMenuOpen){
         this.closeMenu()
         return
     }else{
      this.ShowExitAlert()
     }
     }
   );
  }

  closeMenu() {
    // document.querySelector('ion-menu-controller').close();
    this.events.publish('menu:close');
   }

  async ShowExitAlert() {
  //  this.isAlertVisible = true
    const alert = await this.alertController.create({
      header: 'Closing App',
      message: "Are you sure to close the App ??",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          //  this.isAlertVisible = false
          }
        },
        {
          text: 'Close App',
          role: '',
          cssClass: 'secondary',
          handler: (blah) => {
          //  this.isExit = true
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
  
  segmentChanged(ev){
   this.userType = ev.detail.value
   console.log("userType : "+this.userType)
  }
  

  go(goto:string){
    this.router.navigate([goto]);
  }

  ngOnInit() {
    if(this.plt.ready()){
        this.fcm.getToken().then(
          (token: string) => {
              this.fcmtoken = token
              console.log("latest fcm token : "+token)
          }).catch((err) => {
              console.error(err);
          });
     
    }
  }

  async presentAlert(title:string,msg:string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  registerButtonClick(){

    setTimeout(() => this.router.navigate(['/phone-authentication']),500);
    
  }

  LoginUser() {

    if(this.mobileNumber == ""){
      this.presentAlert("Error","Please enter mobile number");
      return
    }
    else if(this.mobileNumber.length != 11){
      this.presentAlert("Error","Please enter 11 digit mobile number");
      return
    }
    else
    if(this.password == ""){
      this.presentAlert("Error","Please enter Password");
      return
    }

  

    this.user.mobile = this.mobileNumber
    this.user.password = this.password
    this.user.fcmtoken = this.fcmtoken;
    this.user.type = this.userType

    console.log("send to user login : "+JSON.stringify(this.user))
    
    this.service.LoginUser(this.user).subscribe((response) => {

     let res:any;

      console.log("res login : "+JSON.stringify(response))

     for(let obj of response){
        res = obj;
     }


     if(res["response"] == "blocked"){
      this.presentAlert("Error","Your ID has been blocked..");
    }else
     if(res["response"] == "error"){
      this.presentAlert("Invalid Credentials","Either mobile number or password is incorrect\nOR\nUser is not registered with us..");
    }else{

      this.user.userid = res["response"];
      
      this.SaveInStorage("user",JSON.stringify(this.user));

    }
    });
  }
  
SaveInStorage(item:string,value:string){
  if(this.platform.ready()){
      this.nativeStorage.set(item,value)
      .then(
        () => this.router.navigate(['customer-web']),
        error => 
        {
          this.presentAlert("no save","error in saving")
        }
        
      );
      localStorage.setItem(item, value);
   }
}



}
