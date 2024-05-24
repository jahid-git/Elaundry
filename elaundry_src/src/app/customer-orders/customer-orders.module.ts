import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerOrdersPageRoutingModule } from './customer-orders-routing.module';

import { CustomerOrdersPage } from './customer-orders.page';
import { ViewEditOrderComponent } from '../view-edit-order/view-edit-order.component';
import { SelectItemComponent } from '../select-item/select-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerOrdersPageRoutingModule
  ],
  declarations: [CustomerOrdersPage,ViewEditOrderComponent,SelectItemComponent],
  entryComponents:[ViewEditOrderComponent,SelectItemComponent]
})
export class CustomerOrdersPageModule {}
