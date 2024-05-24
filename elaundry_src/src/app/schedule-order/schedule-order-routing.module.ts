import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleOrderPage } from './schedule-order.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleOrderPageRoutingModule {}
