import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'customer-web', pathMatch: 'full' },
 
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'schedule-order',
    loadChildren: () => import('./schedule-order/schedule-order.module').then( m => m.ScheduleOrderPageModule)
  },
  {
    path: 'customer-web',
    loadChildren: () => import('./customer-web/customer-web.module').then( m => m.CustomerWebPageModule)
  },
  {
    path: 'customer-web/:id',
    loadChildren: () => import('./customer-web/customer-web.module').then( m => m.CustomerWebPageModule)
  },
  {
    path: 'create-single-order',
    loadChildren: () => import('./create-single-order/create-single-order.module').then( m => m.CreateSingleOrderPageModule)
  },
  {
    path: 'create-comm-order',
    loadChildren: () => import('./create-comm-order/create-comm-order.module').then( m => m.CreateCommOrderPageModule)
  },
  {
    path: 'customer-orders',
    loadChildren: () => import('./customer-orders/customer-orders.module').then( m => m.CustomerOrdersPageModule)
  },
  
  {
    path: 'phone-authentication',
    loadChildren: () => import('./phone-authentication/phone-authentication.module').then( m => m.PhoneAuthenticationPageModule)
  },
  {
    path: 'payment-success',
    loadChildren: () => import('./payment-success/payment-success.module').then( m => m.PaymentSuccessPageModule)
  },
  {
    path: 'redirect',
    loadChildren: () => import('./redirect/redirect.module').then( m => m.RedirectPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
