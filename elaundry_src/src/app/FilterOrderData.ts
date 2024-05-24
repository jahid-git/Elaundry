import { Time } from '@angular/common';

export class FilterOrderData{
    status:string;
    orderfrom:Date
    orderto:Date
    pickupdatefrom:Date
    pickupdateto:Date
    deliverydatefrom:Date
    deliverydateto:Date
    assignedtopickup:string
    assignedtodelivery:string
    pickedupfrom:Date
    pickedupto:Date
    deliveredfrom:Date
    deliveredto:Date
    vendorid:String
    areaid:String
    paymentstatus:string
    paymentdetails:string
    paymentdatefrom:Date
    paymentdateto:Date
    limitfrom:number
    limitto:number
    customerid:number;
}


