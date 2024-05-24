import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSingleOrderPage } from './create-single-order.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSingleOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSingleOrderPageRoutingModule {}
