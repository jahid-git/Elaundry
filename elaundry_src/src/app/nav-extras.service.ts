import { Injectable } from '@angular/core';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class NavExtrasService {

  extras: any;
  customer:any;
  customer_package:any;
  currentUser:User
  isLoggedIn:boolean;
  isAdminLoggedIn:boolean;

  constructor() {
    this.currentUser = new User()
    this.isLoggedIn = false
    this.isAdminLoggedIn = false
   }

   public setIsAdminLoggedIn(islogin){
    this.isAdminLoggedIn = islogin
  }

  public IsAdminLoggedIn(){
    return this.isAdminLoggedIn
  }
  
  public setExtras(data){
    this.extras = data;
  }

  public getExtras(){
    return this.extras;
  }

  public setCustomer(data){
    this.customer = data;
  }

  public getCustomer(){
    return this.customer;
  }

  public setCustomerPackage(data){
    this.customer_package = data;
  }

  public getCustomerPackage(){
    return this.customer_package;
  }

  public setCurrentUser(data){
    this.currentUser = data;
  }

  public getCurrentUser(){
    return this.currentUser;
  }

  public setIsLoggedIn(islogin){
    this.isLoggedIn = islogin
  }

  public IsLoggedIn(){
    return this.isLoggedIn
  }

}
