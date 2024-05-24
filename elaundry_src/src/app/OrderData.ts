import { Time } from '@angular/common';

export class OrderData{
    orderid:number
    customerid:number
    mobile:string
    name:string
    address:string
    ordertime:Time
    pickupdate:string
    pickuptimeslotfrom:number
    pickuptimeslotto:number
    deliverydate:string
    deliverytimeslotfrom:number
    deliverytimeslotto:number
    orderstatus:string
    assignedtopickup:string
    assignedtodelivery:string
    couponcode:string
    discount:number
    fromwallet:number
    delcharges:number
    bill:number
    paymentstatus:string
    paymentdetails:string
    paymentdate:string
    orderentries;
    type:string //package of single order
    ctype:string
    cdisc:number
    cminbill:number
    cmaxdisc:number
    orderType:string //express or normal
    dbid:number
    vendorid:number
    areaid:number
}


