import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerWebPageRoutingModule } from './customer-web-routing.module';

import { CustomerWebPage } from './customer-web.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerWebPageRoutingModule
  ],
  declarations: [CustomerWebPage]
})
export class CustomerWebPageModule {}
