import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-timeslot',
  templateUrl: './select-timeslot.component.html',
  styleUrls: ['./select-timeslot.component.scss'],
})
export class SelectTimeslotComponent implements OnInit {

  item:any;
  timeslots = [];
  current_selected:string = "";
  isLoading:boolean;

  constructor(public mController:ModalController,
    private params:NavParams) {
      this.current_selected = params.get("current_selected");
      this.timeslots = params.get("timeslots");
      this.isLoading = false;
     }

  ngOnInit() {
   
  }

  SlotSelected(slot:any){
    this.current_selected = slot
      setTimeout( () => {
        this.closeModal()
      },250);
  }

  async closeModal() {
    const onClosedData: string = this.current_selected;
    await this.mController.dismiss(onClosedData);
  }

  CancelClicked(){
    this.closeModal()
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
