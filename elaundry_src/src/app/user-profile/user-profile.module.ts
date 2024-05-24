import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePageRoutingModule } from './user-profile-routing.module';

import { UserProfilePage } from './user-profile.page';
import { SelectAddressOnMapComponent } from '../select-address-on-map/select-address-on-map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilePageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAFlY-p9MFgxSwYqAevGCH36VKFvqBlFQU',
      libraries: ['drawing']
    })
  ],
  entryComponents:[SelectAddressOnMapComponent],
  declarations: [UserProfilePage,SelectAddressOnMapComponent]
})
export class UserProfilePageModule {}
