import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSingleOrderPageRoutingModule } from './create-single-order-routing.module';

import { CreateSingleOrderPage } from './create-single-order.page';
import { SelectTimeslotComponent } from '../select-timeslot/select-timeslot.component';
import { SelectCouponComponent } from '../select-coupon/select-coupon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSingleOrderPageRoutingModule
  ],
  declarations: [CreateSingleOrderPage,SelectTimeslotComponent,SelectCouponComponent],
  entryComponents:[SelectTimeslotComponent,SelectCouponComponent]
})
export class CreateSingleOrderPageModule {}
