import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform, ActionSheetController, MenuController } from '@ionic/angular';
import { User } from '../User';
import { TestServiceService } from '../service/test-service.service';
import { LatLngData } from '../LatLngData';
import { NavExtrasService } from '../nav-extras.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { WindowRef } from '@agm/core/utils/browser-globals';
import { SelectAddressOnMapComponent } from '../select-address-on-map/select-address-on-map.component';
import { Location } from '@angular/common';


@Component({ 
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  isLoading:boolean = false
  isLoggedIn:boolean = false
  isAreaServiceable = false
  isLocationSelected = false
  addressInArea:any;

  ionViewDidEnter(){
    this.menu.enable(true, 'customer-menu');
    this.menu.enable(false, 'delivery-menu');
    this.menu.enable(false, 'vendor-menu');
    this.menu.enable(false, 'admin-menu');
  }

  constructor(public alertCtrl: AlertController,public service:TestServiceService,public mController:ModalController,
public actionSheetController: ActionSheetController, private location:Location,private menu:MenuController,
public router:Router,
                public navDataService:NavExtrasService,public route:Router,private platform:Platform,
                private  nativeStorage:Storage) { 
    this.user = new User();
    
  }

  lat_lng_data:LatLngData = new LatLngData()

  user:User;
  areas:any;
  
  ngOnInit() {

    this.isLoading = true
    this.service.GetAreas()
     .subscribe(data =>{
       this.areas = data;
       this.isLoading =false
     });

     this.CheckUserLogin()
     
  }


  async presentAlertInfo(msg:string) {
    const alert = await this.alertCtrl.create({
      header: 'Info!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }
      ]
    });

    await alert.present();
  }


 
  SaveProfileClick(){
  
    if(!this.isLocationSelected){
      this.presentAlert("Missing Field","Please Select Location");
    }
    else 
    if(!this.isAreaServiceable){
      this.presentAlert("Sorry","Your Location is not Serviceable");
    }
    else
    if(this.user.name=="" || this.user.name == null){
      this.presentAlert("Missing Field","Please Enter Name");
    }    
    else
    if(this.user.address=="" || this.user.address== null){
      this.presentAlert("Missing Field","Please Enter Address");
    }
    else
    if((this.user.password=="" || this.user.password== null )&& !this.isLoggedIn){
      this.presentAlert("Missing Field","Please Enter Password");
    }
    else
    if((this.user.cpassword=="" || this.user.cpassword== null )&& !this.isLoggedIn){
      this.presentAlert("Missing Field","Please Enter Confirm Password");
    }
    else
    if(!this.isLoggedIn && this.user.password.length < 8){
      this.presentAlert("Error Field","Please Enter minimum 8 digit Password");
    }
    else
    if(this.user.password!=this.user.cpassword && !this.isLoggedIn){
      this.presentAlert("Password Mismatch","Please Enter same paswwords in both fields");
    }else{
      if(this.addressInArea != undefined){
      this.user.areaid = this.addressInArea.areaid
      this.user.lat = this.addressInArea.lat
      this.user.lng = this.addressInArea.lng
    }
     // this.presentAlert("Success","Great");
     this.sendPostRequest();
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

    go(goto:string){
      this.router.navigate([goto]);
    }

    sendPostRequest() {
   
      this.isLoading = true

      this.service.RegisterUser(this.user).subscribe((response) => {

        this.isLoading = false
       let res:any;

       for(let obj of response){
          res = obj;
       }


       if(res["response"] != "error" && res["response"] != null){
         if(!this.isLoggedIn){
          this.go('login')
         }else{
           this.go('customer-web')
         }
        
       }

      });

    }

    async SelectLocation(){
      const modal = await this.mController.create({
        component:SelectAddressOnMapComponent,
        componentProps : {
          lat_lng_data:this.lat_lng_data
       //   type:type
        }
      });
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned != null && dataReturned.data !=null) {
             this.CheckSelectedPointServiceability(dataReturned.data)
        }
      });
      return await modal.present();
    } 

    CheckSelectedPointServiceability(data:any){

      this.isLocationSelected = true
      this.isAreaServiceable = false
  
      var point:LatLngData = new LatLngData()
      point.lat = data.lat
      point.lng = data.lng
  
      this.areas.forEach(area => {
        var path:LatLngData[] = []
        area.latlongarray.forEach(latlng => {
          var xy:LatLngData = new LatLngData()
          xy.lat = latlng.lat
          xy.lng = latlng.lng
          path.push(xy)
        });
        console.log("old array : "+JSON.stringify(path))
        if(!this.isAreaServiceable){
        if(this.PointIsInRegion(point.lat,point.lng,path)){
          this.isAreaServiceable = true
          this.addressInArea = area
          this.addressInArea.lat = point.lat
          this.addressInArea.lng = point.lng
          this.lat_lng_data = data;
        }
      }
  
      });
  
    }

    PointIsInRegion(x:number, y:number,thePath:LatLngData[]):boolean
    {
        var crossings = 0;

        var point:LatLngData = new LatLngData()
        point.lat = x;
        point.lng = y;

        var count = thePath.length;
        // for each edge
        var i = 0
        thePath.forEach(a => {
          
          var j = i+1
          if (j >= count)
          {
              j = 0;
          }

         var b:LatLngData = thePath[j]
         if (this.RayCrossesSegment(point, a, b))
         {
             crossings++;
         }
          i = i+1
        });

       
        return (crossings % 2 == 1);
    }

    RayCrossesSegment(point:LatLngData,a:LatLngData,b:LatLngData):boolean
    {
        var px = point.lng;
        var py = point.lat;
        var ax = a.lng;
        var ay = a.lat;
        var bx = b.lng;
        var by = b.lat;
        if (ay > by)
        {
            ax = b.lng;
            ay = b.lat;
            bx = a.lng;
            by = a.lat;
        }
        // alter longitude to cater for 180 degree crossings
        if (px < 0) { px += 360; };
        if (ax < 0) { ax += 360; };
        if (bx < 0) { bx += 360; };

        if (py == ay || py == by) py += 0.00000001;
        if ((py > by || py < ay) || (px > Math.max(ax, bx))) return false;
        if (px < Math.min(ax, bx)) return true;

        var red = (ax != bx) ? ((by - ay) / (bx - ax)) : Number.MAX_VALUE;
        var blue = (ax != px) ? ((py - ay) / (px - ax)) : Number.MAX_VALUE;
        return (blue >= red);
    }

    BackPressed(){
      this.location.back();
    }
    

    CheckUserLogin(){
      if(this.platform.ready()){
          this.nativeStorage.get("isLoggedIn")
          .then(
            data => {
              if(data == null || data == "" || data == undefined || data == "undefined"){
                this.CheckUser()
              }else{
                if(data == "Yes"){
                  this.isLoggedIn = true
                 }else{
                  this.isLoggedIn = false
                 }
            
                 this.CheckUser()

              }
            },
            error =>
              console.error(error)
        );
       }
    }

    CheckUser(){
      if(this.platform.ready()){
          this.nativeStorage.get("user")
          .then(
            data => {
              if(data == null || data == "" || data == undefined || data == "undefined"){
                this.go('phone-login')
              }else{
            
                 this.user = JSON.parse(data)
            
                 if(this.isLoggedIn){
              
                  this.lat_lng_data.lat = this.user.lat
                  this.lat_lng_data.lng = this.user.lng
                  this.isLocationSelected = true
                  this.isAreaServiceable = true
                 }
              }
            },
            error =>
              console.error(error)
        );
       }
    }
      
    SaveInStorage(item:string,value:string){
      if(this.platform.ready()){
          this.nativeStorage.set(item,value)
          .then(
            () => console.log('Stored item!'),
            error => 
            {
              console.error('Error storing item', error)
            }
            
          );
       }
    }

  
}

