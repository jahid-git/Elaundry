import { Component, OnInit ,NgZone} from '@angular/core';
import { NavExtrasService } from '../nav-extras.service';
import { TestServiceService } from '../service/test-service.service';
import { AlertController, ModalController, Platform, MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { SelectCouponComponent } from '../select-coupon/select-coupon.component';
import { OrderData } from '../OrderData';
import { SettingsData } from '../SettingsData';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SelectTimeslotComponent } from '../select-timeslot/select-timeslot.component';

@Component({
  selector: 'app-create-comm-order',
  templateUrl: './create-comm-order.page.html',
  styleUrls: ['./create-comm-order.page.scss'],
})
export class CreateCommOrderPage implements OnInit {

  isLoading:boolean=false
  isSelectItems:boolean = false
  isSelectPickup:boolean = false
  isSelectDelivery:boolean = false
  isShowDetails:boolean = false
  isProceedToOrder:boolean = false
  customer:any;
  isShowTotals:boolean=true

  cbill_entries = [];

  minDate:string;
  maxDate:string;

  dateSelect:Date; 
  ShowSlots:boolean;

  minDelDate:string;
  maxDelDate:string;

  delDateSelect:Date; 
  ShowDelSlots:boolean;
  
  timeslot_arr:any;
  timeslot_arr_full:any=[];
  timeslot_arr_filtered:any;

  timeslot_arr_del:any;

  currentSelected:string
  currentDelSelected:string

  selectedCoupon:any;

  settingsData:SettingsData;

  items = [];
  filteritems = [];

  

  constructor(public serviceCntrl:TestServiceService, private alertController:AlertController,private menu:MenuController,
                  private datePipe:DatePipe,public mController:ModalController,private location: Location,
                  private platform:Platform,private router:Router,public nativeStorage:Storage,private zone:NgZone
                  ) {    

   }

   ionViewDidEnter(){
    this.menu.enable(true, 'customer-menu');
    this.menu.enable(false, 'delivery-menu');
    this.menu.enable(false, 'vendor-menu');
    this.menu.enable(false, 'admin-menu');
  }

   UpdateCbillEntries(){
     this.cbill_entries = []

     this.customer.items.forEach(item => {
       if(item.qty != "" && item.qty != null && item.qty != 0){
         this.cbill_entries.push(item)
       }
     });

     this.SaveInStorage("cbill_entries",JSON.stringify(this.cbill_entries))

   }

   go(goto:string){
    this.router.navigate([goto]);
  }

  ngOnInit() {

    this.GetUserFromStorage()
    this.GetSettingsData()
    
  }

  GetEntriesFromStorage(){
    if(this.platform.ready()){
        this.nativeStorage.get("cbill_entries")
        .then(
          data => {
           this.CheckEntryData(data)
          },
          error =>
            console.error(error)
      );
      }
  }

  CheckEntryData(data){
    if(data == null || data == undefined || data == "undefined" || data == ""){
      this.cbill_entries = [];
    }else{
      this.cbill_entries = JSON.parse(data)
      this.customer.items.forEach(item => {

        this.cbill_entries.forEach(entry => {
          if(entry.itemid == item.itemid){
            item.qty = entry.qty
          }
        });
  
        
      });
  
     
    }
  }

  GoToTnc(){
    window.open("https://elaundry.com.bd/Terms-and-Conditions.html","_self");
  }

  GetSettingsData(){
    this.settingsData = new SettingsData();

    this.isLoading = true
    this.serviceCntrl.GetSettings()
     .subscribe(data =>{
       console.log("settings data : "+JSON.stringify(data))
       data.forEach(setting => {
        this.zone.run(()=>{
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

  GetSrc(img:string):string{
    return "https://elaundry.com.bd/phps/Images/"+img+".jpg"
  }

  
  GetPickupDate():string{
    return this.datePipe.transform(this.dateSelect, 'dd,MMM,yyyy');
  }

  ProceedClicked_o(){
    if(this.isSelectItems)
    {
      if(this.GetTotal() < this.customer.minbill){
        this.presentAlertInfo("Minimum total if items should be "+this.customer.minbill)
      }else{
  
        this.isSelectItems = false

      //  if(this.settingsData.selectpickupnomem){
          this.isSelectPickup = true
          this.isSelectDelivery = true
  
          this.isLoading = true
          this.serviceCntrl.getTimeSlots()
          .subscribe(data =>{

            this.zone.run(()=>{
              this.timeslot_arr_full = data;
              this.isLoading = false
           
  
            var last_ts_end_hr:string = ((this.timeslot_arr_full[(this.timeslot_arr_full.length-1)])
                                .timeslot.split("-"))[1];
            var last_ts_start_hr:string = ((this.timeslot_arr_full[(this.timeslot_arr_full.length-1)])
            .timeslot.split("-"))[0];          
    
            var current_hrs = +(new Date()).getHours();
  
            var days_to_add = Math.floor((+current_hrs + +this.settingsData.pickupafterhrs)/24);
            var min_hr_after_days_add = (+current_hrs + +this.settingsData.pickupafterhrs)%24;
  
            if(days_to_add == 0){
              if((+current_hrs + +this.settingsData.pickupafterhrs) >= +last_ts_start_hr){
                days_to_add = 1
              }
            }else{
              if((+min_hr_after_days_add + +this.settingsData.pickupafterhrs) >= +last_ts_end_hr){
                days_to_add = +days_to_add + 1
              }
            }          
    
          this.minDate = this.datePipe.transform((new Date).setDate((new Date).getDate()+days_to_add), 'yyyy-MM-dd');
          this.maxDate = this.datePipe.transform((new Date).setDate((new Date).getDate()+14), 'yyyy-MM-dd');
          
           this.ShowSlots = false;
            });
            

        });
      
      }
    }
    else
    if(this.isSelectPickup && this.settingsData.selectdelivery)
    {
     
  
      this.SetMinDelDate_o()

    }
    else
    {
      this.isSelectDelivery = false
      this.isShowDetails = true
      this.isProceedToOrder = true
      this.isShowTotals = false
    }
   
   
  }

  SetMinDelDate_o(){
     
    var last_ts_end_hr:string = ((this.timeslot_arr_full[(this.timeslot_arr_full.length-1)])
                                       .timeslot.split("-"))[1];
    var last_ts_start_hr:string = ((this.timeslot_arr_full[(this.timeslot_arr_full.length-1)])
                                       .timeslot.split("-"))[0];     

      var current_hrs = this.GetSlotIn24Format(this.currentSelected,"to") 

      console.log("current hrs : "+current_hrs)
      console.log("GetHrsForDeliveryTime : "+this.GetHrsForDeliveryTime())

      var days_to_add = Math.floor((+current_hrs + +this.GetHrsForDeliveryTime())/24);
      var min_hr_after_days_add = (+current_hrs + +this.GetHrsForDeliveryTime())%24;

      console.log("days_to_add 1 : "+days_to_add)

      if(days_to_add == 0){
        if((+current_hrs + +this.GetHrsForDeliveryTime()) >= +last_ts_start_hr){
          days_to_add = 1
        }
      }else{
        if((+min_hr_after_days_add + +this.GetHrsForDeliveryTime()) >= +last_ts_end_hr){
          days_to_add = +days_to_add + 1
        }
      }          

      console.log("days to add : "+days_to_add)
    
    var dateString = this.datePipe.transform(this.dateSelect,'yyyy-MM-dd')
    var pDate:Date=new Date(dateString)

    this.minDelDate = this.datePipe.transform((new Date).setDate(pDate.getDate()+ +days_to_add), 'yyyy-MM-dd');
    this.maxDelDate = this.datePipe.transform((new Date).setDate(pDate.getDate()+ 14          ), 'yyyy-MM-dd');
    
      console.log("min del date : "+this.minDelDate)
      console.log("max del date : "+this.maxDelDate)

     this.ShowDelSlots = false;
  }

  ClearCart(){
    this.cbill_entries = []
    this.customer.items.forEach(item => {
      item.qty = 0
    });
    this.SaveInStorage("cbill_entries",JSON.stringify(this.cbill_entries))
  }

  GetHrsForDeliveryTime():number{

    console.log("inside GetHrsForDeliveryTime")

   var hrs:number=0

    console.log("be : "+JSON.stringify(this.cbill_entries))

   this.cbill_entries.forEach(entry => {
    console.log("entry ph 1 : "+JSON.stringify(entry))
     if(entry.processhrs > hrs){
       hrs = entry.processhrs
       console.log("entry ph : "+entry.processhrs)
     }
   });

   console.log("return GetHrsForDeliveryTime "+hrs)
   
    return 48 //discuss and edit this
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
            this.go('customer-orders')
          }
        }
      ]
    });

    await alert.present();
  }

  BackPressed(){
    if(this.isShowDetails){
      this.isShowDetails = false
      this.isShowTotals = true
      this.isProceedToOrder = false
      if(this.settingsData.selectdelivery){
        this.isSelectDelivery = true
        this.isSelectPickup = true
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
    else{
      this.location.back();
    }
    
  }

  GetTotal():number{

    var total_of_items = 0

    this.cbill_entries.forEach(item => {
      
      if(item.qty != ""){
        total_of_items = total_of_items + (item.qty)*(item.price)
      }
      
    });


    return total_of_items
  }

  GetTotalPayable():number{
  
    var total_payable:number = 0
  
    try {
    total_payable = this.GetTotal()
    } catch (error) {
      console.log("try catch : "+error)
    }

      return total_payable
    
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

  DateSelected_o(){  
  
   this.ShowTimeSlots_o();
  }

  DelDateSelected_o(){  
    this.ShowDelTimeSlots_o();
  }

  ShowTimeSlots_o(){

  if(this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd') == this.datePipe.transform(this.minDate, 'yyyy-MM-dd')){
      console.log("selected today");
      this.ShowTodayAvailableSlots_o();
    }else{
      console.log("Not selected today");
      this.timeslot_arr = this.ConvertTimeSlotArray(this.timeslot_arr_full);
      this.timeslot_arr_filtered = this.timeslot_arr_full;
      this.ShowSlots = true;
    }
  }

  ShowDelTimeSlots_o(){
    //   if(this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd') == this.datePipe.transform(new Date, 'yyyy-MM-dd')){
     if(this.datePipe.transform(this.delDateSelect, 'yyyy-MM-dd') == this.datePipe.transform(this.minDelDate, 'yyyy-MM-dd')){
         console.log("selected today");
         this.ShowTodayDelAvailableSlots_o();
       }else{
         console.log("Not selected today");
         this.timeslot_arr_del = this.ConvertTimeSlotArray(this.timeslot_arr_full);
         this.timeslot_arr_filtered = this.timeslot_arr_full;
         this.ShowDelSlots = true;
       }
     }
 

  ShowTodayAvailableSlots_o(){

    var hour;
    var splt = +0
    if(this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd') == this.datePipe.transform(new Date, 'yyyy-MM-dd')){
      hour = +(new Date).getHours() + +this.settingsData.pickupafterhrs;
      splt = +0
    }else{
      hour =  (+(new Date).getHours() + +this.settingsData.pickupafterhrs)%24;
      splt = +1
    }

    console.log("hr to compare : "+hour)

      this.timeslot_arr = [];
      this.timeslot_arr_filtered = [];
      for (let obj of this.timeslot_arr_full) {
        if((obj["timeslot"]).split("-")[splt] > hour){
            this.timeslot_arr.push(this.ConvertSlot(obj["timeslot"]));
            this.timeslot_arr_filtered.push(obj["timeslot"]);
          }
      }
      this.ShowSlots = true;
  }

  ShowTodayDelAvailableSlots_o(){

    var hour;
    var splt = +0
 //   if(this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd') == this.datePipe.transform(new Date, 'yyyy-MM-dd')){
 //     hour = +(new Date).getHours() + +this.settingsData.pickupafterhrs;
 //     splt = +0
 //   }else{
      hour =  (+this.GetSlotIn24Format(this.currentSelected,"to") + +this.GetHrsForDeliveryTime())%24;//here
//      splt = +1
//    }

    console.log("hr to compare : "+hour)

      this.timeslot_arr_del = [];
      this.timeslot_arr_filtered = [];
      for (let obj of this.timeslot_arr_full) {
        if((obj["timeslot"]).split("-")[splt] > hour){
            this.timeslot_arr_del.push(this.ConvertSlot(obj["timeslot"]));
            this.timeslot_arr_filtered.push(obj["timeslot"]);
          }
      }
      this.ShowDelSlots = true;
  }
  

  TimeSlotSelected_o(selected_ts:string){
    console.log("selected ts is : "+selected_ts);
    this.currentSelected = selected_ts;
  }

  DelTimeSlotSelected_o(selected_ts:string){
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
    if(this.cbill_entries.length == 0){
      this.presentAlertInfo("Item List is Empty")
      return;
    }else{
        var orderData = new OrderData();

        orderData.orderid = 0
        orderData.customerid = this.customer.userid
        orderData.dbid = this.customer.dbid
        orderData.vendorid = this.customer.vendorid
        orderData.pickupdate = this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd')

        console.log("currentSelected : "+this.currentSelected)

        orderData.pickuptimeslotfrom = +this.currentSelected.split("-")[0]
        orderData.pickuptimeslotto = +this.currentSelected.split("-")[1]
    

        if(this.settingsData.selectdelivery){
          orderData.deliverydate = this.datePipe.transform(this.delDateSelect, 'yyyy-MM-dd')
          orderData.deliverytimeslotfrom = +this.currentDelSelected.split("-")[0]
          orderData.deliverytimeslotto = +this.currentDelSelected.split("-")[1]
        }
        else{
          orderData.deliverytimeslotfrom = 0
          orderData.deliverytimeslotto = 0 
        }
        
        orderData.orderentries = this.cbill_entries
        orderData.orderstatus = "Order Placed"
      
        orderData.bill = this.GetTotalPayable()
        orderData.type = "single"

        console.log("sending orderData : "+JSON.stringify(orderData))

        document.getElementById("comm_order").innerHTML = "Order is processing...";

        this.isLoading = true
        this.serviceCntrl.CreateCorder(orderData)
          .subscribe(data =>{
            this.zone.run(()=>{
            let res:any;
            for(let obj of data){
              res = obj;
            }
            if(res.response != "error" && res.response != null){

              this.cbill_entries = []
              this.SaveInStorage('cbill_entries','')
              this.presentOrderPlaced("Order Created with Order ID : "+res.response)
              
            }
            
            console.log("customer data : "+JSON.stringify(data));
            document.getElementById("comm_order").innerHTML = "Place Order";
            this.isLoading = false
          });
        });

    }
  }

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


  GetUserFromStorage(){
    if(this.platform.ready()){
        this.nativeStorage.get("user")
        .then(
          data => {
           this.CheckData(data)
          },
          error =>
            console.error(error)
      );
      }
  }

  CheckData(data){
    if(data == null || data == undefined || data == "undefined" || data == ""){
      this.go('login')
    }else{
      this.customer = JSON.parse(data);
      this.GetEntriesFromStorage()
      this.isSelectItems = true
    }
  }

  GetFromStorage(item:string){
    if(this.platform.ready()){
        this.nativeStorage.get(item)
        .then(
          data => {
            if(data == null){
            }else{
              return data;
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
          () => console.log("saved"),
          error => 
          {
            console.log("no save","error in saving")
          }
          
        );
      }
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

  GetTotalQty():number{


    var ret_qty = 0

    this.cbill_entries.forEach(row => {
      
        ret_qty = ret_qty+row.qty
      
    });

    return ret_qty
   
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

  DateFormat(inDate):string{
    var outDate = this.datePipe.transform(inDate, 'dd MMM, yyyy')
    return outDate
  }

  showall:boolean = false

  addDays(date: Date, days: number): Date {
    console.log('adding ' + days + ' days');
    console.log(date);
    date.setDate(date.getDate() + days);
    console.log(date);
    return date;
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
    //  this.isShowThankYou = false
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
}
