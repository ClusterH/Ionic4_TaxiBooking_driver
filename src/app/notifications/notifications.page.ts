/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public notifications = [
    {
      title: 'system',
      subtitle: 'Booking #1234 has been Success...',
      iconUrl: '../../assets/success.png',
    },
    {
      title: 'Parmotion',
      subtitle: 'Inivite friend - Get 3 couponse each',
      iconUrl: '../../assets/coupon.png',
    },

    {
      title: 'Parmotion',
      subtitle: 'Inivite friend - Get 3 couponse each',
      iconUrl: '../../assets/coupon.png',
    },

    {
      title: 'system',
      subtitle: 'Booking #1234 has been Success...',
      iconUrl: '../../assets/error.png',
    },

    {
      title: 'system',
      subtitle: 'Booking #1234 has been Success...',
      iconUrl: '../../assets/success.png',
    },


  ]
  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async notificationAlert(item){
      const alert = await this.alertController.create({
        header: `${item.title}`,
        message: `${item.subtitle}`,
        buttons: ['OK']
      });
  
      await alert.present();
  }

}
