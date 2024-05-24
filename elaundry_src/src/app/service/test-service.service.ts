import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError  } from 'rxjs';
import { User } from '../User';
import { retry, catchError } from 'rxjs/operators';
import { customer_limit } from '../customer-limit';
import { ServiceData } from '../ServiceData';
import { OrderData } from '../OrderData';
import { OrderActionData } from '../OrderActionData';
import { TimeSlotData } from '../TimeSlotData';
import { DbData } from '../DbData';
import { SettingsData } from '../SettingsData';

declare var require: any

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  get_timeslots = "https://elaundry.com.bd/phps/get_timeslots.php";
  register_url = "https://elaundry.com.bd/phps/register.php";
  login_url = "https://elaundry.com.bd/phps/login_user.php";
  login_admin_url = "https://elaundry.com.bd/phps/login_admin.php";
  login_vendor_url = "https://elaundry.com.bd/phps/login_vendor.php";
  login_db_url = "https://elaundry.com.bd/phps/login_db.php";
  get_customers_url = "https://elaundry.com.bd/phps/get_customers.php";
  
  manage_service_url = "https://elaundry.com.bd/phps/manage_services.php";
  manage_item_url = "https://elaundry.com.bd/phps/manage_items.php";
  manage_timeslot_url = "https://elaundry.com.bd/phps/manage_timeslot.php";
  manage_vendor_url = "https://elaundry.com.bd/phps/manage_vendors.php";
  manage_db_url = "https://elaundry.com.bd/phps/manage_dbs.php";
  manage_coupon_url = "https://elaundry.com.bd/phps/manage_coupons.php";
  manage_banner_url = "https://elaundry.com.bd/phps/manage_banners.php";
  manage_area_url = "https://elaundry.com.bd/phps/manage_areas.php";

  manage_vendor_payments_url = "https://elaundry.com.bd/phps/manage_vendor_payments.php";
  manage_db_payments_url = "https://elaundry.com.bd/phps/manage_db_payments.php";

  manage_ccustomer_url = "https://elaundry.com.bd/phps/manage_ccustomer.php";
  manage_customer_url = "https://elaundry.com.bd/phps/manage_customer.php";

  get_mapping_url = "https://elaundry.com.bd/phps/get_mapping.php";
  save_mapping_url = "https://elaundry.com.bd/phps/save_mapping.php";

  update_order_entries_url = "https://elaundry.com.bd/phps/update_order_entries.php";

  get_pricelist_url = "https://elaundry.com.bd/phps/get_pricelist.php";
 
  get_item_mapping_url = "https://elaundry.com.bd/phps/get_item_mapping.php";
  update_item_mapping_url = "https://elaundry.com.bd/phps/update_item_mapping.php";

  get_package_details_url = "https://elaundry.com.bd/phps/get_package_details.php";
  update_package_details_url = "https://elaundry.com.bd/phps/update_package_details.php";

  update_pw_url = "https://elaundry.com.bd/phps/update_pw.php";

  search_customer_url = "https://elaundry.com.bd/phps/search_customer.php";
  search_ccustomer_url = "https://elaundry.com.bd/phps/search_ccustomer.php";
  get_full_items_url = "https://elaundry.com.bd/phps/get_full_price_list.php";

  checkout_url = "https://elaundry.com.bd/phps/checkout.php";
  create_order_url = "https://elaundry.com.bd/phps/create_order.php";
  create_corder_url = "https://elaundry.com.bd/phps/create_corder.php";

  get_orders_url = "https://elaundry.com.bd/phps/get_orders.php";
  get_corders_url = "https://elaundry.com.bd/phps/get_corders.php";
  get_db_url = "https://elaundry.com.bd/phps/get_db.php";
  get_db_orders_url = "https://elaundry.com.bd/phps/get_db_orders.php";
  get_db_corders_url = "https://elaundry.com.bd/phps/get_db_corders.php";
  get_vendor_orders_url = "https://elaundry.com.bd/phps/get_vendor_orders.php";
  get_vendor_corders_url = "https://elaundry.com.bd/phps/get_vendor_corders.php";
  change_corder_vendor_url = "https://elaundry.com.bd/phps/change_corder_vendor.php";

  order_action_url = "https://elaundry.com.bd/phps/order_action.php";
  order_action_multi_url = "https://elaundry.com.bd/phps/order_action_multi.php";

  corder_action_url = "https://elaundry.com.bd/phps/corder_action.php";
  corder_action_multi_url = "https://elaundry.com.bd/phps/corder_action_multi.php";

  add_timeslot_url = "https://elaundry.com.bd/phps/add_timeslot.php";
  delete_timeslot_url = "https://elaundry.com.bd/phps/delete_timeslot.php";

  get_all_areas_url = "https://elaundry.com.bd/phps/get_all_areas.php";
  update_area_url = "https://elaundry.com.bd/phps/update_area.php";

  get_coupons_url = "https://elaundry.com.bd/phps/get_coupons.php";
  update_coupon_url = "https://elaundry.com.bd/phps/update_coupon.php";

  cancel_order_url = "https://elaundry.com.bd/phps/cancel_order.php";

  get_order_details_url = "https://elaundry.com.bd/phps/get_order_details.php";
  get_corder_details_url = "https://elaundry.com.bd/phps/get_corder_details.php";

  update_db_url = "https://elaundry.com.bd/phps/update_db.php";
  get_dbid_url = "https://elaundry.com.bd/phps/get_dbid.php";

  get_banners_url = "https://elaundry.com.bd/phps/get_banners.php";
  update_banner_url = "https://elaundry.com.bd/phps/update_banner.php";
  
  get_settings_url = "https://elaundry.com.bd/phps/get_settings.php";
  update_settings_url = "https://elaundry.com.bd/phps/update_settings.php";
  
  get_expcats_url = "https://elaundry.com.bd/phps/get_expense_cats.php";
  update_expcats_url = "https://elaundry.com.bd/phps/update_expense_cats.php";
  
  get_customer_details_url = "https://elaundry.com.bd/phps/get_customer_details.php";

  block_unblock_customer_url = "https://elaundry.com.bd/phps/block_unblock_customer.php"

  update_expense_url = "https://elaundry.com.bd/phps/update_expense.php"
  get_expenses_url = "https://elaundry.com.bd/phps/get_expenses.php"

  vendor_accept_order_url = "https://elaundry.com.bd/phps/vendor_accept_order.php"
  db_accept_order_url = "https://elaundry.com.bd/phps/db_accept_order.php"

  get_totals_url = "https://elaundry.com.bd/phps/get_totals.php"
  get_filtered_orders_url = "https://elaundry.com.bd/phps/get_filtered_orders.php"
  get_filter_excel_url = "https://elaundry.com.bd/phps/get_filter_excel.php"
  get_filtered_corders_url = "https://elaundry.com.bd/phps/get_filtered_corders.php"

  send_otp_url = "https://elaundry.com.bd/phps/send_otp.php"
  send_otp_reset_url = "https://elaundry.com.bd/phps/send_otp_for_pw_reset.php"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  constructor(private httpClient:HttpClient) { }
  
  getTimeSlots() 
  :Observable<any> 
  {
   return    this.httpClient.get(this.get_timeslots);
  }

  SenDOtp(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<customer_limit>(this.send_otp_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  SenDOtpReset(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<customer_limit>(this.send_otp_reset_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetCustomers(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<customer_limit>(this.get_customers_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ResetPassword(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<customer_limit>(this.update_pw_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetTotals(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<customer_limit>(this.get_totals_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  Manageitems(item) 
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
    // var circularObj = {};
     item.circularRef = item;
     item.list = [ item, item ];

   return    this.httpClient
    .post<customer_limit>(this.manage_item_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ManageTimeSlot(item) 
  :Observable<any> 
  {

   return    this.httpClient
    .post<customer_limit>(this.manage_timeslot_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ManageService(item): Observable<any> {

    var stringify = require('json-stringify-safe');
    // var circularObj = {};
     item.circularRef = item;
     item.list = [ item, item ];

    return this.httpClient
    .post<ServiceData>(this.manage_service_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  ManageVendors(item) 
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
    // var circularObj = {};
     item.circularRef = item;
     item.list = [ item, item ];

   return    this.httpClient
    .post<customer_limit>(this.manage_vendor_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ManageBanner(item) 
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
    // var circularObj = {};
     item.circularRef = item;
     item.list = [ item, item ];
     
   return    this.httpClient
    .post<customer_limit>(this.manage_banner_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ManageCoupon(item) 
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
    // var circularObj = {};
     item.circularRef = item;
     item.list = [ item, item ];
     
   return    this.httpClient
    .post<customer_limit>(this.manage_coupon_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ManageCcustomer(item) 
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
    // var circularObj = {};
     item.circularRef = item;
     item.list = [ item, item ];
     
   return    this.httpClient
    .post<customer_limit>(this.manage_ccustomer_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ManageCustomer(item) 
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
    // var circularObj = {};
     item.circularRef = item;
     item.list = [ item, item ];
     
   return    this.httpClient
    .post<customer_limit>(this.manage_customer_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ManageArea(item) 
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
    // var circularObj = {};
     item.circularRef = item;
     item.list = [ item, item ];
     
   return    this.httpClient
    .post<customer_limit>(this.manage_area_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ManageVendorPayment(item) 
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
    // var circularObj = {};
     item.circularRef = item;
     item.list = [ item, item ];
     
   return    this.httpClient
    .post<customer_limit>(this.manage_vendor_payments_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ManageDbPayment(item) 
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
    // var circularObj = {};
     item.circularRef = item;
     item.list = [ item, item ];
     
   return    this.httpClient
    .post<customer_limit>(this.manage_db_payments_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ManageDb(item) 
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
    // var circularObj = {};
     item.circularRef = item;
     item.list = [ item, item ];
     
   return    this.httpClient
    .post<customer_limit>(this.manage_db_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetMapping(item) 
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
   // var circularObj = {};
    item.circularRef = item;
    item.list = [ item, item ];

   return    this.httpClient
    .post<customer_limit>(this.get_mapping_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  SaveMapping(item)
  :Observable<any> 
  {

    var stringify = require('json-stringify-safe');
   // var circularObj = {};
    item.circularRef = item;
    item.list = [ item, item ];
   // console.log();

   return    this.httpClient
    .post<customer_limit>(this.save_mapping_url, stringify(item, null, 2), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetPriceList(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<customer_limit>(this.get_pricelist_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  UpdateOrderEntries(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<customer_limit>(this.update_order_entries_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  CancelOrder(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<customer_limit>(this.cancel_order_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  RegisterUser(item): Observable<any> {
    return this.httpClient
    .post<User>(this.register_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  AddTimeSlot(item): Observable<any> {
    return this.httpClient
    .post<TimeSlotData>(this.add_timeslot_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  LoginUser(item:User): Observable<any> {
    return this.httpClient
      .post<User>(this.login_url, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  LoginVendor(item:User): Observable<any> {
    return this.httpClient
      .post<User>(this.login_vendor_url, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  LoginDb(item): Observable<any> {
    return this.httpClient
      .post<User>(this.login_db_url, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  LoginAdmin(item): Observable<any> {
    return this.httpClient
      .post<User>(this.login_admin_url, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetFilterOrders(item): Observable<any> {
    return this.httpClient
      .post<User>(this.get_filtered_orders_url, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  DownloadFilterOrders(item): Observable<any> {
    return this.httpClient
      .post<User>(this.get_filter_excel_url, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetFilterCorders(item): Observable<any> {
    return this.httpClient
      .post<User>(this.get_filtered_corders_url, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  DeleteTimeSlot(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<TimeSlotData>(this.delete_timeslot_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetItemMapping(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<customer_limit>(this.get_item_mapping_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  UpdateitemMapping(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<customer_limit>(this.update_item_mapping_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  SearchCustomers(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<User>(this.search_customer_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  SearchCcustomers(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<User>(this.search_ccustomer_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetFullItems() 
  :Observable<any> 
  {
   return    this.httpClient.get(this.get_full_items_url);
  }

  CreateOrder(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderData>(this.create_order_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  CheckOut(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderData>(this.checkout_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  CreateCorder(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderData>(this.create_corder_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetOrders(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderData>(this.get_orders_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetCorders(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderData>(this.get_corders_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetVendorOrders(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderData>(this.get_vendor_orders_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetVendorCorders(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderData>(this.get_vendor_corders_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetDbOrders(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderData>(this.get_db_orders_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetDbCorders(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderData>(this.get_db_corders_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  VendorAcceptOrder(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderActionData>(this.vendor_accept_order_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  ChangeCorderVendor(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderActionData>(this.change_corder_vendor_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  DbAcceptOrder(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderActionData>(this.db_accept_order_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  OrderAction(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderActionData>(this.order_action_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  OrderActionMulti(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderActionData>(this.order_action_multi_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  CorderAction(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderActionData>(this.corder_action_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  CorderActionMulti(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderActionData>(this.corder_action_multi_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetAreas() 
  :Observable<any> 
  {
   return    this.httpClient.get(this.get_all_areas_url);
  }

  UpdateArea(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderActionData>(this.update_area_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  UpdateCoupon(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderActionData>(this.update_coupon_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetCoupons(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderActionData>(this.get_coupons_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }


  GetCustomerDetails(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<User>(this.get_customer_details_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetOrderDetails(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderData>(this.get_order_details_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetCorderDetails(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<OrderData>(this.get_corder_details_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  UpdateDb(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<DbData>(this.update_db_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetDbId(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<DbData>(this.get_dbid_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetBanners() 
  :Observable<any> 
  {
   return    this.httpClient.get(this.get_banners_url);
  }

  UpdateBanner(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<ServiceData>(this.update_banner_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetSettings() 
  :Observable<any> 
  {
   return    this.httpClient.get(this.get_settings_url);
  }

  UpdateSettings(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<SettingsData>(this.update_settings_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  UpdateExpense(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<SettingsData>(this.update_expense_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetExpenses(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<SettingsData>(this.get_expenses_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  BlockUnblockCustomer(item)
  :Observable<any> 
  {
   return    this.httpClient
    .post<ServiceData>(this.block_unblock_customer_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GetExpenseCats() 
  :Observable<any> 
  {
   return    this.httpClient.get(this.get_expcats_url);
  }

  UpdateExpenseCats(item) 
  :Observable<any> 
  {
   return    this.httpClient
    .post<DbData>(this.update_expcats_url, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

}
