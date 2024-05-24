import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../service/test-service.service';
import { NavParams, PopoverController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-coupon',
  templateUrl: './select-coupon.component.html',
  styleUrls: ['./select-coupon.component.scss'],
})
export class SelectCouponComponent implements OnInit {
  isLoading:boolean=false
  coupons:any;
  selected_coupon:any;
  customer:any;

  constructor(public serviceCntrl:TestServiceService, public mController:ModalController,
    private params:NavParams) { }

  ngOnInit() {

    this.customer = this.params.get("customer")
    this.customer.task = "area_coupons"

    this.isLoading = true
    this.serviceCntrl.ManageCoupon(this.customer).subscribe((response) => {
      
      this.coupons = response
      this.isLoading = false
     });
  }

  CouponSelected(couponDta:any){
    this.selected_coupon = couponDta
    this.closeModal();
  }

  CancelClicked(){
    this.closeModal()
  }

  async closeModal() {
    const onClosedData: any = this.selected_coupon;
    await this.mController.dismiss(onClosedData);
  }

  GetDiscount(coupon:any):string{
    if(coupon.type.toString().toLowerCase() == "percentage"){
      if(coupon.maxdisc == 0){
        return coupon.discount+"%" 
      }else{
        return coupon.discount+"% upto ৳"+coupon.maxdisc 
      }
      
    }
    else
    if(coupon.type.toString().toLowerCase() == "flat"){
      return "Flat ৳"+coupon.discount 
    }
  }

}
