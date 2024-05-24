import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import * as firebase from 'firebase';
import { PhoneNumber } from '../PhoneNumber';
import { User } from '../User';
import { NavExtrasService } from '../nav-extras.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform, AlertController, MenuController } from '@ionic/angular';
import { timeout } from 'rxjs/operators';
import { TestServiceService } from '../service/test-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  newMobileNumber:string
  phoneNumber = new PhoneNumber()

  verificationCode: string;

  isLogin:boolean
  isGetOtp:boolean
  isVerifyOtp:boolean
  isResetPassword:boolean
  secs:number = 60
  user: any;
  isLoading:boolean=false

  smsCounter:number = 0

  ionViewDidEnter(){
    this.menu.enable(true, 'customer-menu');
    this.menu.enable(false, 'delivery-menu');
    this.menu.enable(false, 'vendor-menu');
    this.menu.enable(false, 'admin-menu');
  }

  constructor(private win: WindowService,public navDataService:NavExtrasService,private nativeStorage:Storage,public router:Router,
                public route:Router, public platform:Platform,private alert:AlertController,public service:TestServiceService
                ,private menu:MenuController) { }

  ngOnInit() {

    this.isGetOtp = true

  }

  otp:number=0


  sendLoginCode() {

    if(this.smsCounter >= 3){
      this.presentAlert("SMS token over", "Try again after 5 minutes");
    } else if(this.newMobileNumber.length < 11){
      this.presentAlert("Error","Enter 11 digit mobile number..")
    }else{
      
      if(this.isLoading){ return; }

      this.otp = Math.floor(100000 + Math.random() * 900000);
      console.log("random otp : "+this.otp);
     
      var sendOtp = new User()
      sendOtp.mobile = this.newMobileNumber
      sendOtp.otp = this.otp
     
      this.isLoading = true
      this.service.SenDOtpReset(sendOtp)
      .subscribe(data =>{
        this.isLoading = false
        console.log("otp response : "+JSON.stringify(data))
        if(data != null && data != undefined){
          if(data.status == "SUCCESS"){
           this.isGetOtp = false
           this.isVerifyOtp = true
           this.secs = 60
           this.StartTimer()
           this.smsCounter++
          }else if(data.error_message == "Invalid MSISDN"){
            this.presentAlert("Error","Entered invaid mobile number..")
          }else if(data[0].response == "noexist"){
            this.presentAlert("Error","Entered mobile number is not registered with us..")
          }else if(data[0].response == "error"){
            this.presentAlert("Error","Some Error, Please Retry..")
          }
        }
      });      
    }

  }

  async presentAlert(title:string,msg:string) {
    const alert = await this.alert.create({
      header: 'Info',
      subHeader: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  StartTimer(){
   if(this.secs > 0){
    setTimeout(() => {
      this.secs = this.secs - 1
      this.StartTimer()
      }, 1000);
    }else{
      console.log("timeout")
    }
  }

  ReSendLoginCode(){
    if(this.secs != 0){
      this.presentAlert(this.secs+" seconds remaining","Please wait..")
      return
    }else{
      this.sendLoginCode()
    }
  }

  verifyLoginCode(){
    if(this.verificationCode == "" || this.verificationCode == "undefined" || this.verificationCode == undefined || this.verificationCode == null){
      alert("OTP is empty..")
      return
    }
   
    if(+this.verificationCode == this.otp){
      this.user = new User()
      this.isVerifyOtp = false
      this.isGetOtp = false
      this.isResetPassword = true
    }else{
      this.presentAlert("Error","Invalid Code..")
    }             

    
  }

  SavePassword(){
    if((this.user.password=="" || this.user.password== null )){
      this.presentAlert("Missing Field","Please Enter Password");
    }
    else
    if((this.user.cpassword=="" || this.user.cpassword== null )){
      this.presentAlert("Missing Field","Please Enter Confirm Password");
    }
    else
    if((this.user.password.length < 8)){
      this.presentAlert("Error Field","Please Enter minimum 8 digit Password");
    }
    else
    if(this.user.password!=this.user.cpassword){
      this.presentAlert("Password Mismatch","Please Enter same paswwords in both fields");
    }else{

      this.user.mobile = this.newMobileNumber
      
      this.isLoading = true

      this.service.ResetPassword(this.user).subscribe((response) => {

        this.isLoading = false
       let res:any;

       for(let obj of response){
          res = obj;
       }


       if(res["response"] != "error" && res["response"] != null && res["response"] == "ok"){
         
        this.presentAlert("Success","Password updated, Please login from new password..")
          this.go('login')
         
       }

      });
    }
  }

  go(goto:string){
    this.router.navigate([goto]);
  }

  
SaveInStorage(item:string,value:string){
  if(this.platform.ready()){
      this.nativeStorage.set(item,value)
      .then(
        () => this.route.navigate(['user-profile']),
        error => 
        {
          console.error('Error storing item', error)
        }
        
      );
   }
}
}
