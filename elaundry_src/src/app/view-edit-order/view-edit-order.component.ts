import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../service/test-service.service';
import { NavParams, ModalController, PopoverController, AlertController, Platform } from '@ionic/angular';
import { CouponData } from '../CouponData';
import { DatePipe } from '@angular/common';
import { SelectCouponComponent } from '../select-coupon/select-coupon.component';
import { SettingsData } from '../SettingsData';
import { AreaData } from '../AreaData';
import { SelectItemComponent } from '../select-item/select-item.component';
import { User } from '../User';
import { OrderActionData } from '../OrderActionData';

@Component({
  selector: 'app-view-edit-order',
  templateUrl: './view-edit-order.component.html',
  styleUrls: ['./view-edit-order.component.scss'],
})
export class ViewEditOrderComponent implements OnInit {

  isExpressService:boolean
  settingsData:SettingsData

  isView:boolean=true
  isEdit:boolean=false

  isLoading:boolean=false
  Order:any
  Viewer:string
  orderEntries=[];
  orderEntriesEdit=[];

  minDate:string;
  maxDate:string;
  minDelDate:string;

  dateSelect:Date; 
  deldateSelect:Date; 
  ShowSlots:boolean;
  ShowDelSlots:boolean
  
  timeslot_arr:any;
  del_timeslot_arr:any;
  timeslot_arr_full:any;
  timeslot_arr_filtered:any;
  del_timeslot_arr_filtered:any;

  currentSelected:string
  currentDelSelected:string
  selectedService:any;

  services:any;
  items:any;

  showBillCalc:boolean = true
  del_charge:number = 0
  discount:number = 0
  selectedCoupon:any
  total_bill:number=0
  delCharge:number = 0

  isCommercial:boolean = false


  constructor(private datePipe:DatePipe,public serviceCntrl:TestServiceService, public mController:ModalController,
    private params:NavParams,public pController:PopoverController,public alertControler:AlertController
    ,private platform:Platform) {
      this.Order =  params.get("orderDta");
      this.Viewer =  params.get("viewer");
      this.isCommercial =  params.get("isCommercial");
     }

     Call(mobile){
      
    }

    async CancelOrderClicked(){
      const alert = await this.alertControler.create({
        header: 'Cancel Order',
        message: "Are you sure to cancel this order ??",
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            //  this.isAlertVisible = false
            }
          },
          {
            text: 'Yes',
            role: '',
            cssClass: 'secondary',
            handler: (blah) => {
              this.isLoading = true

              
              var orderaction = new OrderActionData()
              orderaction.orderstatus = "Canceled"
              orderaction.orderid = this.Order.orderid


              if(!this.isCommercial){
                this.serviceCntrl.OrderAction(orderaction)
                .subscribe(data =>{
                  this.Order.orderstatus = "Canceled"
                  this.isLoading = false
                });
              }else if(this.isCommercial){
                this.serviceCntrl.CorderAction(orderaction)
                .subscribe(data =>{
                  this.Order.orderstatus = "Canceled"
                  this.isLoading = false
                });  
              }

            }
          }
        ]
      });
  
      await alert.present();
    }

  ngOnInit() {
    

    this.minDate = this.datePipe.transform(new Date, 'yyyy-MM-dd');
    
    // this.maxDate = "2020-01-01";
     this.maxDate = this.datePipe.transform((new Date).setDate((new Date).getDate()+7), 'yyyy-MM-dd');

    this.isEdit = false
    this.isView = true

    this.isLoading = true

    if(!this.isCommercial){
      this.serviceCntrl.GetOrderDetails(this.Order)
      .subscribe(data =>{
        this.orderEntries = data
      // this.cloths = data;
        console.log("residential order entries : "+JSON.stringify(data));
        this.isLoading = false
      });
    }else if(this.isCommercial){
      this.serviceCntrl.GetCorderDetails(this.Order)
      .subscribe(data =>{
        this.orderEntries = data
      // this.cloths = data;
        console.log("commercial order entries : "+JSON.stringify(data));
        this.isLoading = false
      });  
    }
    

  

    this.isLoading = true
    this.serviceCntrl.getTimeSlots()
    .subscribe(data =>{
      this.timeslot_arr_full = data;
      this.isLoading = false
    });
  }

  GetSrc(img:string):string{
    return "https://elaundry.com.bd/phps/Images/"+img+".jpg"
  }

  EditClicked(){
    this.isView = false
    this.isEdit = true

    if(this.isCommercial){
      this.cSetOrderData()
    }else{
      this.SetOrderData()  
    }
    
  }

  NewOrderData:any;

  async closeModal() {
    const onClosedData: any = this.NewOrderData;
    await this.mController.dismiss(onClosedData);
  }

  cSetOrderData(){
   
    var getData = new User()
    getData.userid = this.Order.customerid
    getData.task = "get_items"
    getData.mobile = this.Order.mobile

    console.log("sending for cc items : "+JSON.stringify(getData))
    
    this.serviceCntrl.ManageCcustomer(getData)
      .subscribe(data =>{
        this.orderEntriesEdit = data
      // this.cloths = data;

      this.orderEntriesEdit.forEach(item => {

        this.orderEntries.forEach(entry => {
          if(entry.name == item.name){
            item.qty = entry.qty
          }
        });
  
        if(item.qty == null){
          item. qty = 0
        }
        
      });

        console.log("corder citems : "+JSON.stringify(data));
        this.isLoading = false
      });
     
      this.dateSelect = this.Order.pickupdate
      this.deldateSelect = this.Order.deliverydate

      if(this.Order.pickupdate != "0000-00-00"){
        console.log("pd not 0")
        this.DateSelected()
        this.ShowSlots = true
      }

      if(this.Order.deliverydate != "0000-00-00"){
        this.DelDateSelected()
        this.ShowDelSlots = true
      }

      this.currentSelected = this.ConvertSlot(this.Order.pickuptimeslotfrom+"-"+this.Order.pickuptimeslotto)
      this.currentDelSelected = this.ConvertSlot(this.Order.deliverytimeslotfrom+"-"+this.Order.deliverytimeslotto)
      
      this.total_bill = this.Order.bill

}

  SetOrderData(){
   
    this.orderEntriesEdit = this.orderEntries

    var getData = new AreaData()
    getData.areaid = this.Order.areaid
    getData.task = "get_area_services"
    
    this.serviceCntrl.ManageService(getData)
      .subscribe(data =>{
        this.services = data
      // this.cloths = data;
        console.log("area services : "+JSON.stringify(data));
        this.isLoading = false
      });

      this.isLoading = true
      this.serviceCntrl.GetPriceList(this.Order)
      .subscribe(data =>{
        this.items = data
      // this.cloths = data;
        console.log("pricelist : "+JSON.stringify(data));
        this.isLoading = false
      });
     
      this.dateSelect = this.Order.pickupdate
      this.deldateSelect = this.Order.deliverydate

      this.selectedCoupon = new CouponData()

      this.selectedCoupon.couponcode = this.Order.couponcode
      this.selectedCoupon.discount = this.Order.cdisc
      this.selectedCoupon.type = this.Order.ctype
      this.selectedCoupon.minbill = this.Order.cminbill
      this.selectedCoupon.maxdisc = this.Order.cmaxdisc

      if(this.Order.pickupdate != "0000-00-00"){
        console.log("pd not 0")
        this.DateSelected()
        this.ShowSlots = true
      }

      if(this.Order.deliverydate != "0000-00-00"){
        this.DelDateSelected()
        this.ShowDelSlots = true
      }

      this.currentSelected = this.ConvertSlot(this.Order.pickuptimeslotfrom+"-"+this.Order.pickuptimeslotto)
      this.currentDelSelected = this.ConvertSlot(this.Order.deliverytimeslotfrom+"-"+this.Order.deliverytimeslotto)  

      this.discount = this.Order.discount
      this.total_bill = this.Order.bill
      this.delCharge = this.Order.delcharges

}

async SelectCoupon(){
  const popover = await this.mController.create({
    component:SelectCouponComponent
  });
  popover.onDidDismiss().then((dataReturned) => {
    if (dataReturned != null) {
      
      this.selectedCoupon = dataReturned.data

    }
  });
  return await popover.present();
}

ParseInt(data:any):number{
  return parseInt(data)
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
  this.minDelDate =  this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd');
   this.ShowTimeSlots();
    }

  DelDateSelected(){  
    console.log("selected date is : "+
    this.datePipe.transform(this.deldateSelect, 'yyyy-MM-dd'));
    this.ShowDelTimeSlots();
    }

  ShowTimeSlots(){
    if(this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd') == this.datePipe.transform(new Date, 'yyyy-MM-dd')){
      console.log("selected today");
      this.ShowTodayAvailableSlots();
    }else{
      console.log("Not selected today");
      this.timeslot_arr = this.ConvertTimeSlotArray(this.timeslot_arr_full);
      this.timeslot_arr_filtered = this.timeslot_arr_full;
      this.ShowSlots = true;
    }
  }

  ShowDelTimeSlots(){
    if(this.datePipe.transform(this.deldateSelect, 'yyyy-MM-dd') == this.datePipe.transform(new Date, 'yyyy-MM-dd')){
      console.log("selected today");
      this.ShowTodayAvailableDelSlots();
    }else{
      console.log("Not selected today");
      this.del_timeslot_arr = this.ConvertTimeSlotArray(this.timeslot_arr_full);
      this.del_timeslot_arr_filtered = this.timeslot_arr_full;
      this.ShowDelSlots = true;
    }
  }

  ShowTodayAvailableSlots(){
      var hour = (new Date).getHours();
      console.log("hour : "+hour);
      this.timeslot_arr = [];
      this.timeslot_arr_filtered = [];
      for (let obj of this.timeslot_arr_full) {
        if((obj["timeslot"]).split("-")[0] > hour){
          console.log("comp hour : "+(obj["timeslot"]).split("-")[0]);
            this.timeslot_arr.push(this.ConvertSlot(obj["timeslot"]));
            this.timeslot_arr_filtered.push(obj["timeslot"]);
          }
      }
      this.ShowSlots = true;
  }
  
  ShowTodayAvailableDelSlots(){
      var hour = (new Date).getHours();
      console.log("hour : "+hour);
      this.del_timeslot_arr = [];
      this.del_timeslot_arr_filtered = [];
      for (let obj of this.timeslot_arr_full) {
        if((obj["timeslot"]).split("-")[0] > hour){
          console.log("comp hour : "+(obj["timeslot"]).split("-")[0]);
            this.del_timeslot_arr.push(this.ConvertSlot(obj["timeslot"]));
            this.del_timeslot_arr_filtered.push(obj["timeslot"]);
          }
      }
      this.ShowDelSlots = true;
  }

  TimeSlotSelected(selected_ts:string){
    console.log("selected ts is : "+selected_ts);
    this.currentSelected = selected_ts;
  }

  DelTimeSlotSelected(selected_ts:string){
    console.log("selected ts is : "+selected_ts);
    this.currentDelSelected = selected_ts;
  }

  GetTotalOfItems():number{
    var temp_toi:number = 0
    if(this.isEdit){
      this.orderEntriesEdit.forEach(cloth => {
        temp_toi = temp_toi + (cloth.qty)*(cloth.price)
      });
    }else{
      this.orderEntries.forEach(cloth => {
        temp_toi = temp_toi + (cloth.qty)*(cloth.price)
      });
    }
    
    return temp_toi;
  }
  
  CancelEdit(){
    this.isEdit = false
    this.orderEntriesEdit = [] 
  }

  GetDiscount():number{
  
    console.log("calculating disount "+JSON.stringify(this.selectedCoupon))
  
    if(this.selectedCoupon == null || this.selectedCoupon.couponcode == ""){
      return 0
    }
  
    if(this.selectedCoupon == null){
      console.log("calculating disount 1")
      return 0
    }else if(this.selectedCoupon.couponcode == ""){
      console.log("calculating disount 2")
      return 0
    }else if(this.selectedCoupon.minbill > this.GetTotalOfItems()){
      console.log("calculating disount 3")
      return 0
    }else{
      if(this.selectedCoupon.type.toLowerCase() == "percentage"){
        if(this.selectedCoupon.maxdisc == 0){
          console.log("calculating disount 4")
          return this.GetTotalOfItems()*this.selectedCoupon.discount/100;
        }else{
          if(this.GetTotalOfItems()*this.selectedCoupon.discount/100 > this.selectedCoupon.maxdisc){
            console.log("calculating disount 6")
            return this.selectedCoupon.maxdisc
          }else{
            console.log("calculating disount 7")
            return this.GetTotalOfItems()*this.selectedCoupon.discount/100
          }
        }
      }else if(this.selectedCoupon.type.toLowerCase() == "flat"){
        console.log("calculating disount 8")
        return this.selectedCoupon.discount
      }else{
        console.log("type error : "+this.selectedCoupon.type)
      }
    }
  
    return 0
  
  }
  
  GetTotalPayable():number{
  
    var total_payable:number = 0
  
    total_payable = this.GetTotalOfItems() - (this.GetDiscount() - this.delCharge);
  
  //  if(this.isExpressService){
   //   return (total_payable*(100 + +this.settingsData.expresspercent))/100
  //  }else{
      console.log("total payable : "+total_payable)
      return total_payable
  //  }
  }
  
  async ServiceSelected(selected_service:any){
    this.selectedService = selected_service;

   

    const popover = await this.pController.create({
      component:SelectItemComponent,
      componentProps : {
        SelectedService:this.selectedService,
        items:this.items
      }
    });
    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data != null) {
       
        this.orderEntriesEdit.push(dataReturned.data)
        
      }else{
        console.log("backed null")
      }
    });
    return await popover.present();

  }

  async presentAlertInfo(msg:string) {
    const alert = await this.alertControler.create({
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

  CreateOrder(){
      this.CreateSingleOrder()
  
  }

  CreateSingleOrder(){
   
    this.Order.orderentries = this.orderEntriesEdit
    if(this.selectedCoupon == null || this.selectedCoupon.couponcode == ""){
      this.Order.couponcode = ""
      this.Order.cdisc = 0
      this.Order.ctype = ""
      this.Order.cminbill = 0
      this.Order.cmaxdisc = 0
    }else{
      this.Order.couponcode = this.selectedCoupon.couponcode
      this.Order.cdisc = this.selectedCoupon.discount
      this.Order.ctype = this.selectedCoupon.type
      this.Order.cminbill = this.selectedCoupon.minbill
      this.Order.cmaxdisc = this.selectedCoupon.maxdisc
    }
    this.Order.discount = this.GetDiscount()
    this.Order.delcharges = this.delCharge
    this.Order.bill = this.GetTotalPayable()

    if(this.Viewer == "db"){
      this.isLoading = true
      this.serviceCntrl.UpdateOrderEntries(this.Order)
        .subscribe(data =>{
          let res:any;
          for(let obj of data){
            res = obj;
          }
          if(res.response != "error" && res.response != null){
            this.presentAlertInfo("Order Edited with Order ID : "+res.response)
          //  this.RefreshOrder()
          this.NewOrderData = this.Order
          }
          // this.cloths = data;
          console.log("customer data : "+JSON.stringify(data));
          this.isLoading = false
        });
    }else{

    /*
 if(this.SelectedClothList.length == 0){
      console.log("missing Clothes");
      this.presentAlertInfo("CLothes List is Empty")
      return;
    }else
    if(this.deldateSelect == null){
      console.log("missing deldateselect");
      this.presentAlertInfo("Please Select Delivery Date")
      return;
    }else
    if(this.currentDelSelected == "" || this.currentDelSelected == null){
      console.log("missing currentDelSelected");
      this.presentAlertInfo("Please Select Delivery TimeSlot")
      return;
    }else
    */

        if(this.dateSelect != null){
          this.Order.pickupdate = this.dateSelect
        }
        if(this.deldateSelect != null){
          this.Order.deliverydate = this.deldateSelect
        }
        if(this.currentSelected != null){
          this.Order.pickuptimeslotfrom = this.GetSlotIn24Format(this.currentSelected,"from")
          this.Order.pickuptimeslotto = this.GetSlotIn24Format(this.currentSelected,"to")
        }
        if(this.currentDelSelected != null){
          this.Order.deliverytimeslotfrom = this.GetSlotIn24Format(this.currentDelSelected,"from")
        this.Order.deliverytimeslotto = this.GetSlotIn24Format(this.currentDelSelected,"to")
        }

        if(this.isExpressService){
          this.Order.orderType = "express"
        }else{
          this.Order.orderType = "normal"
        }

        this.isLoading = true
        this.serviceCntrl.CreateOrder(this.Order)
          .subscribe(data =>{
            let res:any;
            for(let obj of data){
              res = obj;
            }
            if(res.response != "error" && res.response != null){
              this.presentAlertInfo("Order Edited with Order ID : "+res.response)
            //  this.RefreshOrder()
            this.NewOrderData = this.Order
            }
            // this.cloths = data;
            console.log("customer data : "+JSON.stringify(data));
            this.isLoading = false
          });
        }
    
  }


  GetSettingsData(){
    this.settingsData = new SettingsData();
  
    this.isLoading = true
    this.serviceCntrl.GetSettings()
      .subscribe(data =>{
        console.log("settings data : "+JSON.stringify(data))
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
  }

  DateFormat(inDate):string{
    var outDate = this.datePipe.transform(inDate, 'dd MMM, yyyy')
    return outDate
  }

  GetTotalQty():number{


    var ret_qty = +0

    this.orderEntries.forEach(row => {
      
        ret_qty = +ret_qty + +row.qty
      
    });

    return +ret_qty
   
  }

  GetTotal():number{


    var ret_t = +0

    this.orderEntries.forEach(row => {
      
        ret_t = +ret_t + +(+row.qty*+row.price)
      
    });

    return +ret_t
   
  }

}
