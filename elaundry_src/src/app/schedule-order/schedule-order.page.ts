import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TestServiceService } from '../service/test-service.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-schedule-order',
  templateUrl: './schedule-order.page.html',
  styleUrls: ['./schedule-order.page.scss'],
})
export class ScheduleOrderPage implements OnInit {
  isLoading:boolean = false
  minDate:string;
  maxDate:string;

  dateSelect:Date; 
  ShowSlots:boolean;
  
  timeslot_arr:any;
  timeslot_arr_full:any;
  timeslot_arr_filtered:any;

  service:string;

  constructor(private route: ActivatedRoute,private datePipe:DatePipe,private testService:TestServiceService) { }

  ngOnInit() {
    const{minDate,maxDate} = this
    this.isLoading = true
    this.route.queryParams.subscribe(params => {
      this.service = params["selectedService"];
      console.log("on SO got service : "+this.service);
      this.isLoading = false
  });

    this.minDate = this.datePipe.transform(new Date, 'yyyy-MM-dd');
   // this.maxDate = "2020-01-01";
    this.maxDate = this.datePipe.transform((new Date).setDate((new Date).getDate()+7), 'yyyy-MM-dd');

    const {dateSelect,ShowSlots} = this

    this.ShowSlots = false;
    this.isLoading = true
    this.testService.getTimeSlots()
    .subscribe(data =>{
      this.timeslot_arr_full = data;
      //this.timeslot_arr = this.ConvertTimeSlotArray(data);
      this.isLoading = false
    });

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
    console.log("selected date is : "+
    this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd'));
   // this.ShowSlots = true;
   this.ShowTimeSlots();
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
  
    TimeSlotSelected(selected_index:string){
      console.log("selected ts is : "+this.ConvertSlot(this.timeslot_arr_filtered[selected_index]));
    }

}
