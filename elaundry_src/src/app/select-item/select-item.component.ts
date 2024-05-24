import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
})
export class SelectItemComponent implements OnInit {

  priceList:any;
  items:any;
  FilterItems:any;
  service:any;

  SelectedItem:any;

  SearchItemText:string = "";

  constructor(public pController:PopoverController,
    private params:NavParams) {

      this.service = params.get("SelectedService");
      this.priceList = params.get("items");
     }

  ngOnInit() {

    this.items = []

    this.priceList.forEach(item => {
      if(item.serviceid = this.service.serviceid){
        this.items.push(item)
      }
    });

  }


  ItemSelected(selected_item){
    selected_item.qty = 1
    selected_item.servicename = this.service.name
    this.SelectedItem = selected_item;
    this.closeModal()
  }

  SearchedItems(){
    
    this.FilterItems = [];

    for(let item of this.items){
      if(item.name.toLowerCase().includes(this.SearchItemText.toLowerCase())){
        this.FilterItems.push(item)
      }
    }

    return this.FilterItems;
  }

  async closeModal() {
    const onClosedData: any = this.SelectedItem;
    await this.pController.dismiss(onClosedData);
  }

}
