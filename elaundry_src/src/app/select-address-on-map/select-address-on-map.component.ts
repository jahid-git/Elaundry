import { Component, OnInit,AfterContentInit,ViewChild } from '@angular/core';
import { LatLngData } from '../LatLngData';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-select-address-on-map',
  templateUrl: './select-address-on-map.component.html',
  styleUrls: ['./select-address-on-map.component.scss'],
})
export class SelectAddressOnMapComponent implements OnInit {
  height = 0;
  currentLat:number
  currentLong:number
  centerLat:number
  centerLong:number
  lat_lng_data:LatLngData = new LatLngData()

  constructor(public mController:ModalController, private params:NavParams,
    private geolocation: Geolocation,private plt:Platform) {

      this.lat_lng_data = params.get('lat_lng_data');

      if(this.lat_lng_data.lat != null && this.lat_lng_data.lng != 0){

        this.currentLat  = +this.lat_lng_data.lat
        this.centerLat   = +this.lat_lng_data.lat
        this.currentLong = +this.lat_lng_data.lng
        this.centerLong  = +this.lat_lng_data.lng
      }

     }


  ngOnInit() {
    if(this.plt.ready()){
         this.height = this.plt.height();
      } 
  }

  MapIsReady(){

    setTimeout(()=>{
      this.height = this.height+1;
    }, 100);


    if(this.lat_lng_data.lat != null && this.lat_lng_data.lng != 0){

      this.currentLat  = +this.lat_lng_data.lat
      this.centerLat   = +this.lat_lng_data.lat
      this.currentLong = +this.lat_lng_data.lng
      this.centerLong  = +this.lat_lng_data.lng

    }else{
      this.GetCurrentLocation();
    }
    
  }

  MapCenterChanged(event){
   
    this.centerLat = event.lat
    this.centerLong = event.lng
   
 }

  GetCurrentLocation(){

    this.geolocation.getCurrentPosition().then((resp) => {
      
      this.currentLat  = resp.coords.latitude
      this.centerLat   = resp.coords.latitude
      this.currentLong = resp.coords.longitude
      this.centerLong  = resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
   
    
  }

  Done(){
    var data:LatLngData = new LatLngData()
    data.lat = this.centerLat
    data.lng = this.centerLong
    this.closeModal(data)
  }

  async closeModal(data:LatLngData) {
    const onClosedData: any = data;
    await this.mController.dismiss(onClosedData);
  }


}
