import { Component, OnInit ,NgZone} from '@angular/core';
import { AlertController, ModalController, Platform, MenuController } from '@ionic/angular';
import { TestServiceService } from '../service/test-service.service';
import { GetOrdersData } from '../GetOrdersData';
import { ViewEditOrderComponent } from '../view-edit-order/view-edit-order.component';
import { Location, DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.page.html',
  styleUrls: ['./customer-orders.page.scss'],
})
export class CustomerOrdersPage implements OnInit {
  customer:any
  isLoading:boolean=false
  orders:any
  type:string
  isCommercial:boolean=false

  ionViewDidEnter(){
    this.menu.enable(true, 'customer-menu');
    this.menu.enable(false, 'delivery-menu');
    this.menu.enable(false, 'vendor-menu');
    this.menu.enable(false, 'admin-menu');

    this.CheckUser()

  }

  constructor(private serviceCntrl:TestServiceService,private nativeStorage:Storage, private platform:Platform,
    public alertController:AlertController,private location: Location,private router:Router,private datePipe:DatePipe,
    public mController:ModalController,private menu:MenuController,private zone:NgZone) {
    //  this.customer = this.navExtras.getCustomer()
     }

  ngOnInit() {
   
    
     document.addEventListener('resume', () => {
      //this.saveUserAccess();
      console.log("resume event fired")
      this.CheckUser()
      },false);
    
/*
      this.platform.resume.subscribe((result)=>{
        console.log("resume event fired")
        this.CheckUser()
      });
      */
  }

  PayNowClicked(order){
    var source:String="ios";

 

     window.open("https://elaundry.com.bd/phps/checkout.php?bill="+order.bill+"&name="+order.name+
               "&email="+order.email+"&address="+order.address+"&mobile="+order.mobile+"&orderid="+order.orderid
              +"&source="+source,"_self");
  }

  async ViewOrderDetails(order:any){
    const popover = await this.mController.create({
      component:ViewEditOrderComponent,
      componentProps : {
        orderDta:order,
        viewer:"customer",
        isCommercial:this.isCommercial
      }
    });
    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data != null) {
       order = dataReturned.data
    

      }else{
        console.log("backed null")
      }
    });
    return await popover.present();
  }

  BackPressed() {
    this.router.navigate(['customer-web']);
  } 

  CheckUser(){
    if(this.platform.ready()){
        this.nativeStorage.get('user')
        .then(
          data => {
            if(data == null){
            }else{
              this.customer = JSON.parse(data);
              if(this.customer.userid != null && this.customer.userid != 0){
               this.GetOrders()
                
              }else{
              }

            }
          },
          error =>
            console.error(error)
      );
      
     
        
     }
  }

  GetOrders(){
    var getOrdersData = new GetOrdersData()
    getOrdersData.basis = "customer"
    getOrdersData.status = this.customer.userid

    this.isLoading = true

    this.type = this.customer.type

    if(this.customer.type == 'residential'){
      this.isCommercial = false
      this.serviceCntrl.GetOrders(getOrdersData)
      .subscribe(data =>{
        this.zone.run(()=>{
          this.orders = data;
          this.isLoading = false
        });
        
        console.log("customer orders : "+JSON.stringify(this.orders))
        
        console.log("after loading false")
      });
    }else if(this.customer.type == 'commercial'){
      this.isCommercial = true
      this.serviceCntrl.GetCorders(getOrdersData)
      .subscribe(data =>{
        this.zone.run(()=>{
          this.orders = data;
          this.isLoading = false
        });
      });
    }
    
  }

  DateFormat(inDate):string{
    var outDate = this.datePipe.transform(inDate, 'dd MMM, yyyy')
    return outDate
  }

  ConvertSlot(slot:string):string{
    
    var from_time1 = slot.split("-");
    var from_time = from_time1[0];
    var to_time1 = slot.split("-");
    var to_time = to_time1[1];
    
    return this.AddAmPm(from_time)+" to "+this.AddAmPm(to_time);
  }

  AddAmPm(time:string):string{
    
    switch(time){
      
      case "1":
        return "1:00 AM";
      
      case "2":
        return "2:00 AM";
        
        case "3":
          return "3:00 AM";
        
        case "4":
          return "4:00 AM";
          
          case "5":
            return "5:00 AM";
          
          case "6":
            return "6:00 AM";  

            case "7":
              return "7:00 AM";
            
            case "8":
              return "8:00 AM";

              case "9":
        return "9:00 AM";
      
      case "10":
        return "10:00 AM";
        
        case "11":
          return "11:00 AM";
        
        case "12":
          return "12:00 AM";
          
          case "13":
            return "1:00 PM";
          
          case "14":
            return "2:00 PM";  

            case "15":
              return "3:00 PM";
            
            case "16":
              return "4:00 PM";
              case "17":
                return "5:00 PM";      
      case "18":
        return "6:00 PM";
                    
        case "19":
          return "7:00 PM";
                    
        case "20":
          return "8:00 PM";
                      
          case "21":
            return "9:00 PM";
                      
          case "22":
            return "10:00 PM";
            
            case "23":
              return "11:00 PM";
                        
            case "24":
              return "12:00 PM";
            
    }

    return "d";
  }
}
