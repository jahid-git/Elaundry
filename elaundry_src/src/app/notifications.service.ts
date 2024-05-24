import { Injectable } from '@angular/core';
import {firebase} from '@firebase/app';
import '@firebase/messaging';
import {environment} from '../environments/environment';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public nativeStorage:Storage,public platform:Platform) {

   }


  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        navigator.serviceWorker.ready.then((registration) => {
            // Don't crash an error if messaging not supported
            if (!firebase.messaging.isSupported()) {
                   resolve();
                   return;
            }

            const messaging = firebase.messaging();

            // Register the Service Worker
            messaging.useServiceWorker(registration);

            // Initialize your VAPI key
            messaging.usePublicVapidKey(
                  environment.firebase.vapidKey
            );

            // Optional and not covered in the article
            // Listen to messages when your app is in the foreground
            messaging.onMessage((payload) => {
                console.log(payload);
            });
            // Optional and not covered in the article
            // Handle token refresh
            messaging.onTokenRefresh(() => {
                messaging.getToken().then(
                (refreshedToken: string) => {
                    console.log(refreshedToken);
                }).catch((err) => {
                    console.error(err);
                });
            });

            resolve();
        }, (err) => {
            reject(err);
        });
    });
  }

  requestPermission(): Promise<void> {
    return new Promise<void>(async (resolve) => {
        if (!Notification) {
            resolve();
            return;
        }
        if (!firebase.messaging.isSupported()) {
            resolve();
            return;
        }
        try {
            const messaging = firebase.messaging();
            await messaging.requestPermission();

            const token: string = await messaging.getToken();

            this.SaveInStorage("fcmtoken",token)

        } catch (err) {
            // No notifications granted
        }

        resolve();
    });
}

GetFromStorage(item:string):string{
    if(this.platform.ready()){
      if(this.platform.is('cordova')){
       // this.IsShowDownloadApp = false
        this.nativeStorage.get(item)
        .then(
          data => {
            if(data == null){
            }else{
              return data;
            }
          },
          error =>
            console.error(error)
      );
      }
      else
      {
      //  this.IsShowDownloadApp = true
        if(localStorage.getItem(item) != null){
          return localStorage.getItem(item)
      }
      } 
     }
  }
    
  SaveInStorage(item:string,value:string){
    if(this.platform.ready()){
      if(this.platform.is('cordova')){
        this.nativeStorage.set(item,value)
        .then(
          () => console.log('saved'),
          error => 
          {
         //   this.presentAlert("no save","error in saving")
          }
          
        );
      }else{
      //  this.presentAlert("no save","no cordova")
      localStorage.setItem(item,value)
    //  this.router.navigate(['customer-web']);
      }
     }
  }
}
