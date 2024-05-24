import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerWebPage } from './customer-web.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerWebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerWebPageRoutingModule {}
