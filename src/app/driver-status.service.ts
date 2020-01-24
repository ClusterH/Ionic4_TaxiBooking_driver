
/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import {
  LoadingController
} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DriverStatusService {
  driverStatus: boolean;
  userCard: boolean;
  rideInProgress = false;

  constructor(public loadingCtrl: LoadingController) {
    this.driverStatus = false;
    this.userCard = false;
  }

  async loading(message) {
    const loader = await this.loadingCtrl.create({
      message
    });
    return loader;
  }
}
