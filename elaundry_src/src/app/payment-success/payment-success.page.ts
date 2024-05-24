import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {

  ionViewDidEnter(){
    this.menu.enable(true, 'customer-menu');
    this.menu.enable(false, 'delivery-menu');
    this.menu.enable(false, 'vendor-menu');
    this.menu.enable(false, 'admin-menu');
  }

  constructor(private menu:MenuController) {}

  ngOnInit() {
  }

}
