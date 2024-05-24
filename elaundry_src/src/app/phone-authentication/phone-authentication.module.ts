import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneAuthenticationPageRoutingModule } from './phone-authentication-routing.module';

import { PhoneAuthenticationPage } from './phone-authentication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneAuthenticationPageRoutingModule
  ],
  declarations: [PhoneAuthenticationPage]
})
export class PhoneAuthenticationPageModule {}
