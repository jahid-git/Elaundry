import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleOrderPageRoutingModule } from './schedule-order-routing.module';

import { ScheduleOrderPage } from './schedule-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleOrderPageRoutingModule
  ],
  declarations: [ScheduleOrderPage]
})
export class ScheduleOrderPageModule {}
