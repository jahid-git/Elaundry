import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCommOrderPageRoutingModule } from './create-comm-order-routing.module';

import { CreateCommOrderPage } from './create-comm-order.page';
import { CreateSingleOrderPageModule } from '../create-single-order/create-single-order.module';
import { SelectTimeslotComponent } from '../select-timeslot/select-timeslot.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCommOrderPageRoutingModule,
    CreateSingleOrderPageModule,
    CreateSingleOrderPageModule
  ],
  declarations: [CreateCommOrderPage],
  entryComponents:[]
})
export class CreateCommOrderPageModule {}
