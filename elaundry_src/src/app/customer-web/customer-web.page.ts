import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TestServiceService } from '../service/test-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController, Platform, MenuController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { ServiceData } from '../ServiceData';

@Component({
  selector: 'app-customer-web',
  templateUrl: './customer-web.page.html',
  styleUrls: ['./customer-web.page.scss'],
})
export class CustomerWebPage implements OnInit
//,
//AfterContentInit
 {

  ionViewDidEnter(){
      this.menu.enable(false, 'customer-menu');
      this.menu.enable(false, 'delivery-menu');
      this.menu.enable(false, 'vendor-menu');
      this.menu.enable(false, 'admin-menu');
    
    this.CheckToShowWelcome()
  }

 /*
  ngAfterContentInit(): void {
    if(this.isLoggedIn){
      this.events.publish('user:login');
    }else if (!this.isLoggedIn){
      this.events.publish('user:logout');
    }
  }
 */


  isLoading:boolean=false
  isLoggedIn:boolean = false
  isShowWelcome:boolean = false

  banners = [];
  slideOpts = {
    initialSlide: 0,
    effect:'flip',
    autoplay:{
        delay:2000
    },
    speed: 1000,
    init:true,
    loop:true,
    pager:true
  };

  services:any;

  user:any;

 

  constructor(private serviceCntrl:TestServiceService,private route:ActivatedRoute,public alertCtrl:AlertController,
    private nativeStorage:Storage,public alertController:AlertController,public platform:Platform,
        public router:Router,public events: Events,private menu:MenuController) {
    
   }

   ServiceSelected(selected_service:any){
     this.SaveInStorage("selected_service",JSON.stringify(selected_service))
    this.go('create-single-order')
   }

  ngOnInit() {

  }

  go(goto:string){
    this.router.navigate([goto]);
  }

  GetSrc(img:string):string{
    return "https://elaundry.com.bd/phps/Images/"+img+".jpg"
  }

  GetImgSrc(img:string):string{
    return "https://elaundry.com.bd/phps/Images/"+img+".jpg";
  }

  openMenu() {
    document.querySelector('ion-menu-controller')
      .open();
  }

  HomeClicked(){
    console.log("home clicked")
  }

  MyOrdersClicked(){
    this.go('customer-orders')
  }

  CheckToShowWelcome(){
    if(this.platform.ready()){
        this.nativeStorage.get("isFirstRun")
        .then(
          data => {
            if(data == null || data == "" || data == undefined || data == "undefined"){
              this.isShowWelcome = true
              this.UpdateInStorage("isFirstRun","no")
            }else{
              this.isShowWelcome = false
              this.CheckUser()
            }
          },
          error =>
            console.error(error)
      );
     }
  }

  UpdateInStorage(item:string,value:string){
    if(this.platform.ready()){
        this.nativeStorage.set(item,value)
        .then(
          () => console.log(""),
          error => 
          {
            this.presentAlert("no save","error in saving")
          }
          
        );
        localStorage.setItem(item, value);
     }
  }

  SaveInStorageNproceed(item:string,value:string){
    if(this.platform.ready()){
        this.nativeStorage.set(item,value)
        .then(
          () =>  this.CommerialOrderClicked(),
          error => 
          {
            this.presentAlert("no save","error in saving")
          }
          
        );
        localStorage.setItem(item, value);
     }
  }
    
  SaveInStorage(item:string,value:string){
    if(this.platform.ready()){
        this.nativeStorage.set(item,value)
        .then(
          () => console.log("saved "+item),
          error => 
          {
            this.presentAlert("no save","error in saving")
          }
          
        );
        localStorage.setItem(item, value);
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

  CheckUser(){
    if(this.platform.ready()){
      if(this.platform.is('cordova')){
        this.nativeStorage.get('user')
        .then(
          data => {
            if(data == null || data == "" || data == undefined || data == "undefined"){
              this.isLoggedIn = false
              this.events.publish('user:logout');
              this.go('login')
            }else{
              this.user = JSON.parse(data);
              if(this.user.userid != null && this.user.userid != 0){
                this.SaveInStorage("isLoggedIn","Yes")
               this.UserLoggedIn(this.user)
              }else{
                this.isLoggedIn = false
                this.events.publish('user:logout');
              this.go('login')
              }

            }
          },
          error =>
            console.error(error)
      );
        } else {
          const data = localStorage.getItem('user');
          if(data == null || data == "" || data == undefined || data == "undefined"){
            this.isLoggedIn = false
            this.events.publish('user:logout');
            this.go('login')
          }else{
            this.user = JSON.parse(data);
            if(this.user.userid != null && this.user.userid != 0){
              this.SaveInStorage("isLoggedIn","Yes")
             this.UserLoggedIn(this.user)
            }else{
              this.isLoggedIn = false
              this.events.publish('user:logout');
            this.go('login')
            }

          }
        }
        
     }
  }

  LogoutClicked(){
    this.SaveInStorage("user","");
    this.SaveInStorage("isLoggedIn","No");
    this.isLoggedIn = false
    this.events.publish('user:logout');
  }


  UserLoggedIn(user){
    this.isLoggedIn = true
    this.events.publish('user:login');

    if(user.type == "residential"){
      this.isLoading = true
      this.serviceCntrl.GetCustomerDetails(user)
        .subscribe(data =>{
  
          let res:any;
  
          console.log("res login : "+JSON.stringify(data))
    
         for(let obj of data){
            res = obj;
         }
  
          this.user = res;
          this.user.type = "residential"
          this.services = res.services;
          this.banners = res.banners;
          this.SaveInStorage("user",JSON.stringify(this.user))
          this.isLoading = false
          this.events.publish('user:login');
          this.go('create-single-order')
        });
    }else
    if(user.type == "commercial")
    {

      this.isLoading = true
      user.task = "get_details"
      this.serviceCntrl.ManageCcustomer(user)
        .subscribe(data =>{
  
          let res:any;
  
          console.log("comm login : "+JSON.stringify(data))
    
         for(let obj of data){
            res = obj;
         }
  
          this.user = res;
          this.user.type = "commercial"
        //  this.services = res.services;
        //  this.banners = res.banners;
        this.isLoading = false
        this.events.publish('user:login');
          this.SaveInStorageNproceed("user",JSON.stringify(this.user))
         
        
         
        });
    }
    
  }

  GetAllServices(){
    this.isLoading = true
    var serviceData = new ServiceData();
    serviceData.task = "get"
    this.serviceCntrl.ManageService(serviceData)
      .subscribe(data =>{
        console.log("got all services : "+JSON.stringify(data))
        this.services = data
        this.isLoading = false
      });

      this.serviceCntrl.GetBanners()
      .subscribe(data =>{
        this.banners = data;
      });

  }

  CommerialOrderClicked(){
    this.go('create-comm-order')
  }

  ServiceClicked(){
    this.go('login')
  }

}
