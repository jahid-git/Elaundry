import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerOrdersPage } from './customer-orders.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOrdersPageRoutingModule {}
