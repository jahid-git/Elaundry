import { Component, OnInit ,NgZone, Renderer2, ElementRef} from '@angular/core';
import { NavExtrasService } from '../nav-extras.service';
import { TestServiceService } from '../service/test-service.service';
import { AlertController, ModalController, Platform, Events, MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { SelectCouponComponent } from '../select-coupon/select-coupon.component';
import { OrderData } from '../OrderData';
import { SettingsData } from '../SettingsData';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SelectTimeslotComponent } from '../select-timeslot/select-timeslot.component';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-single-order',
  templateUrl: './create-single-order.page.html',
  styleUrls: ['./create-single-order.page.scss'],
})
export class CreateSingleOrderPage implements OnInit {

  isLoading:boolean=false
  service:any;
  isSelectItems:boolean = false
  isSelectPickup:boolean = false
  isSelectDelivery:boolean = false
  isShowDetails:boolean = false
  isProceedToOrder:boolean = false
  isShowThankYou:boolean = false
  services:any;
  priceList:any; //this is full pricelist, means mapping data
  SearchItemText:string = "";
  customer:any;
  isShowTotals:boolean=true

  bill_entries = [];

  minDate:string;
  maxDate:string;

  dateSelect:Date; 
  ShowSlots:boolean;

  minDelDate:string;
  maxDelDate:string;

  delDateSelect:Date; 
  ShowDelSlots:boolean;
  
  timeslot_arr_full=[];
  timeslot_arr=[];
  timeslot_arr_del=[];

  currentSelected:string
  currentDelSelected:string

  selectedCoupon:any;

  settingsData:SettingsData;
  isExpressService:boolean = false

  items = [];
  filteritems = [];

  selected_service_index = 0;
  isMenuOpen:boolean=false

  isSearch:boolean=false

  couponCode:string = "";
  showInvalidCodeError:boolean = false;
  showDiscountSuccess:boolean = false;

  notFoundText:string = ''


  constructor(public serviceCntrl:TestServiceService, private alertController:AlertController,private menu:MenuController,
                  private datePipe:DatePipe,public mController:ModalController,private location: Location,
                  private platform:Platform,private router:Router,public nativeStorage:Storage,public events: Events
                  ,private zone:NgZone, private renderer: Renderer2, private el: ElementRef) {    

                    events.subscribe('menu:opened', () => {
                      this.isMenuOpen = true
                      console.log("got event menu open")
                  });
                  
                  events.subscribe('menu:closed', () => {
                      this.isMenuOpen = false
                      console.log("got event menu closed")
                  });

   }

   SearchClicked(){
      this.isSearch = true
   }

   HideSearch(){
     this.isSearch = false
     this.SearchItemText = ""
   }

   isExit:boolean=false

   ionViewCanLeave(): boolean{
    // here we can either return true or false
    // depending on if we want to leave this view
    return this.isExit
   }

   ionViewWillEnter(){
     this.isExit=false
    this.subscription = this.platform.backButton.subscribeWithPriority(10000,
      () => {
        console.log("didenter back")
        if(this.isMenuOpen){
          this.closeMenu()
          return
      }else{
       this.BackPressed()
      }
      }
    );
   }

   ionViewDidEnter(){
      this.menu.enable(true, 'customer-menu');
      this.menu.enable(false, 'delivery-menu');
      this.menu.enable(false, 'vendor-menu');
      this.menu.enable(false, 'admin-menu');
    
     this.GetBillEntriesFromStorage()
     if(this.customer == undefined || this.customer == null){
      this.GetUserFromStorage();
      this.GetSettingsData()
     }

   }

   ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

   GetBillEntriesFromStorage(){
    if(this.platform.ready()){
        this.nativeStorage.get("bill_entries")
        .then(
          data => {
            if(data == null || data == undefined || data == "" || data == "undefined"){
            }else{
              this.bill_entries = JSON.parse( data);
            }
          },
          error =>
            console.error(error)
      );
      
     }
  }

   go(goto:string){
    this.router.navigate([goto]);
  }

  ngOnInit() {
    console.log("here 1")
    this.GetUserFromStorage();
    this.GetSettingsData()
  }


  GetUserFromStorage(){
    if(this.platform.ready()){
        this.nativeStorage.get("user")
        .then(
          data => {
            if(data == null || data == undefined || data == "" || data == "undefined"){
              this.go('login')
            }else{
              this.customer = JSON.parse(data);
              this.GotCustomer()
            }
          },
          error =>
            console.error(error)
      );
     }
  }

  GotCustomer(){
    this.events.publish('user:login');
    this.services = this.customer.services
    this.isLoading = true
    this.serviceCntrl.GetPriceList(this.customer)
    .subscribe(data =>{
      this.zone.run(()=>{
      console.log("pl : "+JSON.stringify(data))
     this.priceList = data
     this.ServiceSelected(this.services[0])
     this.isLoading = false
    });
  });

    this.isSelectItems = true
  }

  GetSettingsData(){
    this.settingsData = new SettingsData();

    this.isLoading = true
    this.serviceCntrl.GetSettings()
     .subscribe(data =>{
      this.zone.run(()=>{
       data.forEach(setting => {
         this.settingsData.expresspercent = setting.expresspercent
         this.settingsData.pickupafterhrs = setting.pickupafterhrs
         if(setting.selectdeliverytime == 0){
          this.settingsData.selectdelivery = false
         }else{
          this.settingsData.selectdelivery = true
         }          
         
       });
       this.isLoading =false
     });  
    });
  }

  ServiceChanged(ev){

    var service = this.services[ev.detail.value]
    this.ServiceSelected(service)
    this.focusSegment(ev.detail.value)
  }

  focusSegment(segmentId) {

    document.getElementById(segmentId).scrollIntoView({ 
  //   this.cat_segment.scrollIntoView({ 
       behavior: 'smooth',
       block: 'center',
       inline: 'center'
     });
 }

  GetSrc(img:string):string{
    return "https://elaundry.com.bd/phps/Images/"+img+".jpg"
  }

  ServiceSelected(service){

    var i = 0;

    this.services.forEach(service1 => {
      if(service.serviceid == service1.serviceid){
        this.selected_service_index = i
        console.log("selected_service_index : "+this.selected_service_index)
      }
      i++
    });

    console.log("ServiceSelected class : "+JSON.stringify(service)
    )
    this.items = [];

    this.priceList.forEach(listitem => {
      if(listitem.serviceid == service.serviceid){
        listitem.processhrs = service.processhrs
        listitem.servicename = service.name
        console.log("service ph : "+service.processhrs)
        console.log("service name : "+service.name)
        this.items.push(listitem)
      }
    }); 

    this.notFoundText = 'Our operation is not available in your selected area. We will be opening in this area as soon as possible. Thank you for your patience'

    console.log("items after push : "+JSON.stringify(this.items))
    
  }

  PlusItem(item){

    var already_added = false
    this.bill_entries.forEach(row => {
      if(row.mappingid == item.mappingid){
        already_added = true
        row.qty = row.qty + 1
      }
    });

    if(!already_added){
      console.log("not already added")
      item.qty = 1
      this.bill_entries.push(item)
      console.log("plus ce : "+JSON.stringify(this.bill_entries))
    }

    this.SaveInStorage("bill_entries",JSON.stringify(this.bill_entries))

  }

  MinusItem(item){

    var i=0;
    this.bill_entries.forEach(row => {
      if(row.mappingid == item.mappingid){
        if(row.qty == 1){
          this.bill_entries.splice(i,1)
        }
        else
        if(row.qty != 0){
          row.qty = row.qty - 1
        }
      }
      i++
    });

    this.SaveInStorage("bill_entries",JSON.stringify(this.bill_entries))

  }

  GetPickupDate():string{
    return this.datePipe.transform(this.dateSelect, 'dd,MMM,yyyy');
  }

  ProceedClicked(){
    if(this.isSelectItems)
    {
      if(this.GetTotal() < this.customer.minbill){
        this.presentAlertInfo("Minimum total if items should be "+this.customer.minbill)
      }else{
  
        this.isSelectItems = false

          this.isSelectPickup = true

          this.timeslot_arr_full = [];

          this.isLoading = true
          this.serviceCntrl.getTimeSlots()
          .subscribe(data =>{
            this.zone.run(()=>{
            this.timeslot_arr_full = data;
            this.isLoading = false
         
          var last_ts_start_hr:string = ((this.timeslot_arr_full[(this.timeslot_arr_full.length-1)]).timeslot.split("-"))[0];          
  
          var current_hrs = +(new Date()).getHours();

          var days_to_add = Math.floor((+current_hrs + +this.settingsData.pickupafterhrs)/24);
          var min_hr_after_days_add = (+current_hrs + +this.settingsData.pickupafterhrs)%24;

          console.log("days_to_add : "+days_to_add)
          console.log("this.settingsData.pickupafterhrs : "+this.settingsData.pickupafterhrs)
          console.log("min_hr_after_days_add : "+min_hr_after_days_add)
          console.log("last_ts_start_hr : "+last_ts_start_hr)


          if(days_to_add == 0){
            if((+current_hrs + +this.settingsData.pickupafterhrs) >= +last_ts_start_hr){
              days_to_add = 1
            }
          }else{
            if((+min_hr_after_days_add + +this.settingsData.pickupafterhrs) >= +last_ts_start_hr){
              days_to_add = +days_to_add + 1
            }
          }          
  
        this.minDate = this.datePipe.transform((new Date).setDate((new Date).getDate()+days_to_add), 'yyyy-MM-dd');
        this.maxDate = this.datePipe.transform((new Date).setDate((new Date).getDate()+14), 'yyyy-MM-dd');
        
        const today = new Date()
        const dateX = new Date(today)
        dateX.setDate(dateX.getDate() + 1)

        this.dateSelect = dateX
        this.DateSelected()

        });
      });
       
      
      }
    } 
    else
    {



      this.isSelectPickup = false
      this.isSelectDelivery = false
      this.isShowDetails = true
      this.isProceedToOrder = true
      this.isShowTotals = false
      this.isShowThankYou = false
    }
   
   
  }

  SetMinDelDate(){

    this.showall = false
    
    var last_ts_start_hr:string = ((this.timeslot_arr_full[(this.timeslot_arr_full.length-1)]).timeslot.split("-"))[0];

   // var current_hrs = this.GetSlotIn24Format(this.currentSelected,"to") 
   var current_hrs = this.currentSelected.split("-")[1] 

    var days_to_add = Math.floor((+current_hrs + +this.GetHrsForDeliveryTime())/24);

    console.log("from 1 : "+days_to_add)

    var min_hr_after_days_add = 0;
    if((+current_hrs + +this.GetHrsForDeliveryTime()) > 24*(days_to_add)){
      min_hr_after_days_add = (+current_hrs + +this.GetHrsForDeliveryTime())%24;
    }else{
      min_hr_after_days_add = 0
    }

    console.log("from 2 : "+min_hr_after_days_add)
    

    if(days_to_add == 0){
      if((+current_hrs + +this.GetHrsForDeliveryTime()) >= +last_ts_start_hr){
        days_to_add = 1
      }
    }else{
      if((+min_hr_after_days_add) > +last_ts_start_hr){
        days_to_add = +days_to_add + 1
        this.showall = true
      }
    }  
    
    console.log("from 3 : "+days_to_add)
   
    this.minDelDate = this.datePipe.transform(
     this.addDays(new Date(this.dateSelect), days_to_add)
      , 'yyyy-MM-dd');

      this.delDateSelect = this.addDays(new Date(this.dateSelect), days_to_add) 
      console.log("from 300 : "+this.delDateSelect)
      
      this.maxDelDate = this.datePipe.transform(
        this.addDays(new Date(this.dateSelect), days_to_add+14)
         , 'yyyy-MM-dd');
      console.log("min date del : "+this.minDelDate)

        this.DelDateSelected()

  }

  showall:boolean = false

  addDays(date: Date, days: number): Date {
    console.log('adding ' + days + ' days');
    console.log(date);
    date.setDate(date.getDate() + days);
    console.log(date);
    return date;
  }

  ClearCart(){
    this.bill_entries = []
    this.SaveInStorage("bill_entries",JSON.stringify(this.bill_entries))
  }

  GetHrsForDeliveryTime():number{

    console.log("inside GetHrsForDeliveryTime")

   var hrs:number=0

    console.log("be : "+JSON.stringify(this.bill_entries))

   this.bill_entries.forEach(entry => {
    console.log("entry ph 1 : "+JSON.stringify(entry))
     if(entry.processhrs > hrs){
       hrs = entry.processhrs
       console.log("entry ph : "+entry.processhrs)
     }
   });

   console.log("return GetHrsForDeliveryTime "+hrs)
   
    return hrs
  }

  async presentAlertInfo(msg:string) {
    const alert = await this.alertController.create({
      header: 'Info!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('ok pressed');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentOrderPlaced(msg:string) {
    const alert = await this.alertController.create({
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

  async SelectCoupon(){
    const popover = await this.mController.create({
      component:SelectCouponComponent,
      componentProps : {
        customer:this.customer
      }
    });
    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned != null) {
        
        this.selectedCoupon = dataReturned.data

      }
    });
    return await popover.present();
  }

  subscription:Subscription;

  BackPressed(){
    if(this.isShowDetails){
      this.isShowDetails = false
      this.isShowTotals = true
      this.isProceedToOrder = false
      if(this.settingsData.selectdelivery){
        this.isSelectDelivery = true
      }else{
        this.isSelectPickup = true
      }
    }
    else
    if(this.isSelectDelivery || this.isSelectPickup){
      this.isSelectDelivery = false
      this.isSelectPickup = false
      this.isSelectItems = true
    }
    else
    if(this.isShowThankYou){
      this.go('customer-orders')
    }
    else{
    //  this.location.back();
    this.ShowExitAlert()
    }
    
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
            this.isExit = true
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

  GetTotal():number{

    var total_of_items = 0

    this.bill_entries.forEach(item => {
      
      total_of_items = total_of_items + (item.qty)*(item.price)

      
    });


    return total_of_items
  }


  Discount() {
    if(this.isLoading) {return;}

    const discountBtn = this.el.nativeElement.querySelector("#discount-btn");
    this.renderer.setProperty(discountBtn, 'innerHTML', 'Checking...');

    this.selectedCoupon = null;
    this.showInvalidCodeError = false;
    this.showDiscountSuccess = false;

    this.customer.task = "area_coupons"
    this.isLoading = true;

    this.serviceCntrl.ManageCoupon(this.customer).subscribe((response) => {
      this.selectedCoupon = response.find(coupon => coupon.couponcode === this.couponCode);

        if(this.selectedCoupon != null) {
          this.showDiscountSuccess = true;
          this.showInvalidCodeError = false;
        } else {
          this.showDiscountSuccess = false;
          this.showInvalidCodeError = true;
        }
        this.isLoading = false;
        this.renderer.setProperty(discountBtn, 'innerHTML', 'Check');
    });
  }

  onCouponCodeChange() {
    this.showDiscountSuccess = false;
    this.showInvalidCodeError = false;
  }

  getErrorColor() {
    return this.showInvalidCodeError ? 'danger' : '';
  }

  GetDiscount():number{
    if(this.selectedCoupon == null || this.selectedCoupon.couponcode == "" || this.selectedCoupon.minbill > this.GetTotal()){
      return 0
    } else {
      if(this.selectedCoupon.type.toLowerCase() == "percentage"){
        if(this.selectedCoupon.maxdisc == 0){
          return (this.GetTotal()*this.selectedCoupon.discount)/100;
        }else{
          if(((this.GetTotal()*this.selectedCoupon.discount)/100) > this.selectedCoupon.maxdisc){
            return this.selectedCoupon.maxdisc
          }else{
            return (this.GetTotal()*this.selectedCoupon.discount)/100
          }
        }
      }else if(this.selectedCoupon.type.toLowerCase() == "flat"){
        return this.selectedCoupon.discount
      }
    }
  
    return 0
  
  }

  GetDelcharge():number{
  
   
          if(this.GetTotal() >= this.customer.dcupto){
            return 0
          }else{
            return this.customer.delcharge
          }  
  }
  
  ExpressCheckChange(){}

  GetTotalPayable():number{
  
    var total_payable:number = 0
  
    try {
    total_payable = this.GetTotal() - (this.GetDiscount() - this.GetDelcharge())
    } catch (error) {
      console.log("try catch : "+error)
    }

    if(this.isExpressService){
      return (total_payable*(100 + +this.settingsData.expresspercent))/100
    }else{
      console.log("total payable : "+total_payable)
      return total_payable
    }
    
    
  }

  GetTotalQty():number{


    var ret_qty = 0

    this.bill_entries.forEach(row => {
      
        ret_qty = ret_qty+row.qty
      
    });

    return ret_qty
   
  }

  GetItemQty(item):number{


    var ret_qty = 0

    this.bill_entries.forEach(row => {
      if(row.mappingid == item.mappingid){
        ret_qty = row.qty
      }
    });

    return ret_qty
   
  }

  SearchedItems():any{
    
    this.filteritems = [];

    for(let item of this.items){
      if(item.name.toLowerCase().includes(this.SearchItemText.toLowerCase())){
        this.filteritems.push(item)
      }
    }

    console.log("return filter : "+JSON.stringify(this.filteritems))

    return this.filteritems;
  }

  ConvertTimeSlotArray(arr1:any):any{
    var arr2 = new Array();

    for (let obj of arr1) {
      arr2.push(this.ConvertSlot(obj["timeslot"]));
    }
    return arr2;
  }

  ConvertSlot(slot:string):string{
    
    var from_time1 = slot.split("-");
    var from_time = from_time1[0];
    var to_time1 = slot.split("-");
    var to_time = to_time1[1];
    
    return this.AddAmPm(from_time)+" - "+this.AddAmPm(to_time);
  }

  AddAmPm(time:string):string{
    
    switch(time){
      
      case "1":
        return "1 AM";
      
      case "2":
        return "2 AM";
        
        case "3":
          return "3 AM";
        
        case "4":
          return "4 AM";
          
          case "5":
            return "5 AM";
          
          case "6":
            return "6 AM";  

            case "7":
              return "7 AM";
            
            case "8":
              return "8 AM";

              case "9":
        return "9 AM";
      
      case "10":
        return "10 AM";
        
        case "11":
          return "11 AM";
        
        case "12":
          return "12 AM";
          
          case "13":
            return "1 PM";
          
          case "14":
            return "2 PM";  

            case "15":
              return "3 PM";
            
            case "16":
              return "4 PM";
              case "17":
                return "5 PM";      
      case "18":
        return "6 PM";
                    
        case "19":
          return "7 PM";
                    
        case "20":
          return "8 PM";
                      
          case "21":
            return "9 PM";
                      
          case "22":
            return "10 PM";
            
            case "23":
              return "11 PM";
                        
            case "24":
              return "12 PM";
            
    }

    return "d";
  }

  DateSelected(){  
    this.delDateSelect = null
    this.currentDelSelected = ""
   this.ShowTimeSlots();
  }

  DelDateSelected(){  
    this.currentDelSelected = ""
    this.ShowDelTimeSlots();
  }

 
  ShowTimeSlots(){

  if(this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd') == this.datePipe.transform(this.minDate, 'yyyy-MM-dd')){
      console.log("selected today");
      this.ShowTodayAvailableSlots();
    }else{
      console.log("Not selected today");
      this.timeslot_arr = this.timeslot_arr_full;
      this.currentSelected = this.timeslot_arr[0].timeslot
      this.CheckAndSetMinDel()
      console.log("current Selected 2 : "+this.currentSelected)

      this.ShowSlots = true;
    }
  }

  CheckAndSetMinDel(){
    if(this.isSelectPickup && this.settingsData.selectdelivery)
    {
  
        this.isSelectDelivery = true
        this.SetMinDelDate()

    }
  }

  ShowDelTimeSlots(){
    //   if(this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd') == this.datePipe.transform(new Date, 'yyyy-MM-dd')){
     if(this.datePipe.transform(this.delDateSelect, 'yyyy-MM-dd') == this.datePipe.transform(this.minDelDate, 'yyyy-MM-dd')){
         console.log("selected today");
         this.ShowTodayDelAvailableSlots();
       }else{
         console.log("Not selected today");
         this.timeslot_arr_del = this.timeslot_arr_full;
         this.currentDelSelected = this.timeslot_arr_del[0].timeslot
         this.ShowDelSlots = true;
       }
     }
 

  ShowTodayAvailableSlots(){

    var hour;
    var splt = +0
    
    if(this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd') == this.datePipe.transform(new Date, 'yyyy-MM-dd')){
      hour = +(new Date).getHours() + +this.settingsData.pickupafterhrs;
    }else{

      var hr = (+(new Date).getHours() + +this.settingsData.pickupafterhrs)
      if(hr <= 24){
        hour = 0
      } else{
        hour = hr%24;
      }
    }

    console.log("hr to compare : "+hour)

      this.timeslot_arr = [];
      for (let obj of this.timeslot_arr_full) {
        if((obj["timeslot"]).split("-")[splt] > hour){
            this.timeslot_arr.push(obj);
          }
      }

      this.currentSelected = this.timeslot_arr[0].timeslot
      this.CheckAndSetMinDel()
      console.log("current Selected 1 : "+this.currentSelected)
      this.ShowSlots = true;
  }

  ShowTodayDelAvailableSlots(){

    var hour;
    var splt = +1
 //   if(this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd') == this.datePipe.transform(new Date, 'yyyy-MM-dd')){
 //     hour = +(new Date).getHours() + +this.settingsData.pickupafterhrs;
 //     splt = +0
 //   }else{
   
 if(!this.showall){
 // hour =  (+this.GetSlotIn24Format(this.currentSelected,"to") + +this.GetHrsForDeliveryTime())%24;
 hour =  (+this.currentSelected.split("-")[0] + +this.GetHrsForDeliveryTime())%24;
 }else{
  hour = 0
 }
   
//      splt = +1
//    }



    console.log("hr to compare : "+hour)

      this.timeslot_arr_del = [];
      for (let obj of this.timeslot_arr_full) {
        if((obj["timeslot"]).split("-")[splt] >= hour){
            this.timeslot_arr_del.push(obj);
          }
      }
      this.currentDelSelected = this.timeslot_arr_del[0].timeslot
      this.ShowDelSlots = true;
  }
  

  TimeSlotSelected(selected_ts:string){
    console.log("selected ts is : "+selected_ts);
    this.currentSelected = selected_ts;
    this.delDateSelect = null
    this.currentDelSelected = ""
    this.CheckAndSetMinDel()
  }

  DelTimeSlotSelected(selected_ts:string){
    console.log("selected ts is : "+selected_ts);
    this.currentDelSelected = selected_ts;
  }

  PlaceOrderClicked(){
    if(this.isLoading){ return; }

    if(this.customer.mobile == "" || this.customer.mobile == null){
      console.log("missing CustomerMobile");
      this.presentAlertInfo("Please Login")
      return;
    }else
    if(this.bill_entries.length == 0){
      this.presentAlertInfo("Item List is Empty")
      return;
    }else { 
        var orderData = new OrderData();

        if(this.isExpressService){
          orderData.orderType = "express"
        }else{
          orderData.orderType = "normal"
        }

        orderData.orderid = 0
        orderData.customerid = this.customer.userid
        orderData.areaid = this.customer.areaid
        orderData.pickupdate = this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd')
      //  orderData.pickuptimeslotfrom = this.GetSlotIn24Format(this.currentSelected,"from")
      //  orderData.pickuptimeslotto = this.GetSlotIn24Format(this.currentSelected,"to")  
        orderData.pickuptimeslotfrom = +this.currentSelected.split("-")[0]
        orderData.pickuptimeslotto = +this.currentSelected.split("-")[1]
    

        if(this.settingsData.selectdelivery){
          orderData.deliverydate = this.datePipe.transform(this.delDateSelect, 'yyyy-MM-dd')
          orderData.deliverytimeslotfrom = +(this.currentDelSelected.split("-")[0])
          orderData.deliverytimeslotto = +(this.currentDelSelected.split("-")[0])  
        }
        else{
          orderData.deliverytimeslotfrom = 0
          orderData.deliverytimeslotto = 0 
        }
        
        orderData.orderentries = this.bill_entries
        orderData.orderstatus = "Order Placed"

        if(this.selectedCoupon == null || this.selectedCoupon.couponcode == ""){
          orderData.couponcode = ""
          orderData.cdisc = 0
          orderData.ctype = ""
          orderData.cminbill = 0
          orderData.cmaxdisc = 0
        }else{
          orderData.couponcode = this.selectedCoupon.couponcode
          orderData.cdisc = this.selectedCoupon.discount
          orderData.ctype = this.selectedCoupon.type
          orderData.cminbill = this.selectedCoupon.minbill
          orderData.cmaxdisc = this.selectedCoupon.maxdisc
        }
        orderData.discount = this.GetDiscount()
        orderData.delcharges = this.GetDelcharge()
        orderData.bill = this.GetTotalPayable()
        orderData.type = "single"

        console.log("sending orderData : "+JSON.stringify(orderData))

        document.getElementById("single_order").innerHTML = "Order is processing...";

        this.isLoading = true
        this.serviceCntrl.CreateOrder(orderData)
          .subscribe(data =>{
            console.log("create order res : "+JSON.stringify(data))
            this.zone.run(()=>{
        
            let res:any;
            for(let obj of data){
              res = obj;
            }
            if(res.response != "error" && res.response != null){

              this.bill_entries = []
              this.SaveInStorage('bill_entries','')
              this.isSelectItems = false
              this.isSelectPickup = false
              this.isSelectDelivery = false
              this.isShowDetails = false
              this.isProceedToOrder = false

              this.orderid = res.response;
              this.bill = orderData.bill;

           
              this.isShowThankYou = true
              
            }
            
            console.log("customer data : "+JSON.stringify(data));
            document.getElementById("single_order").innerHTML = "Place Order";
            this.isLoading = false
          });
        });
    }
  }

  PayNow(){

    var source:String="ios";



     window.open("https://elaundry.com.bd/phps/checkout.php?bill="+this.bill+"&name="+this.customer.name+
              "&email="+this.customer.email+"&address="+this.customer.address+"&mobile="+this.customer.mobile+"&orderid="+this.orderid
              +"&source="+source,"_self");
  }

  GoToHome(){
    this.isSelectItems = true
    this.isSelectPickup = false
    this.isSelectDelivery = false
    this.isShowDetails = false
    this.isProceedToOrder = false
    this.isShowTotals = true
    this.isShowThankYou = false
 }


GoToTnc(){
  window.open("https://elaundry.com.bd/Terms-and-Conditions.html","_self");
}

  orderid:string="0"
  bill:number = 0

  GetSlotIn24Format(time:string,fromOrTo:string):number{
    
    var withAmPms:string[] = time.split(" - ");
    if(fromOrTo == "from"){
      var ts:string = withAmPms[0].split(" ")[0]
      var am_pm:string = withAmPms[0].split(" ")[1]

      if(am_pm =="AM"){
        return +ts
      }else{
        return (+ts)+12
      }
    }else
    if(fromOrTo == "to"){
      var ts:string = withAmPms[1].split(" ")[0]
      var am_pm:string = withAmPms[1].split(" ")[1]

      if(am_pm =="AM"){
        return +ts
      }else{
        return (+ts)+12
      }
    }

    }

  

  async  ShowTimeSlotsClicked(){

    const popover = await this.mController.create({
      component:SelectTimeslotComponent,
      componentProps : {
        timeslots:this.timeslot_arr,
        current_selected:this.currentSelected
      }
    });
    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned != null && dataReturned.data != null && dataReturned != undefined && dataReturned.data != undefined) {
        
        this.TimeSlotSelected(dataReturned.data)

      }
    });
    return await popover.present();
  }

  async  ShowDelTimeSlotsClicked(){

    const popover = await this.mController.create({
      component:SelectTimeslotComponent,
      componentProps : {
        timeslots:this.timeslot_arr_del,
        current_selected:this.currentDelSelected
      }
    });
    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned != null && dataReturned.data != null && dataReturned != undefined && dataReturned.data != undefined) {
        
        this.DelTimeSlotSelected(dataReturned.data)

      }
    });
    return await popover.present();
  }
      
    SaveInStorage(item:string,value:string){
      if(this.platform.ready()){
          this.nativeStorage.set(item,value)
          .then(
            () => console.log("saved"),
            error => 
            {
              console.log("no save","error in saving")
            }
            
          );
       }
    }

    DateFormat(inDate):string{
      var outDate = this.datePipe.transform(inDate, 'dd MMM, yyyy')
      return outDate
    }
}
