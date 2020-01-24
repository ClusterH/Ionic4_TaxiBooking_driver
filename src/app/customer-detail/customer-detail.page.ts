/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {
  public tripFare: Array<any> = [];
  public userDeatils: any = {}
  public lat: number;
  public long: number;
  userOrigin: any;
  driverOrigin: any;

  constructor(
    private route: Router,
    private act_route: ActivatedRoute,
    public alertController: AlertController,
    private geolocation: Geolocation,
    private launchNavigator: LaunchNavigator,
    private callNumber: CallNumber
  ) {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('resp', resp)
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log('data', data)
    });
  }

  ngOnInit() {
    this.tripFare = [
      { title: 'Apple Pay', pay: '$15' },
      { title: 'Discount', pay: '$10' },
      { title: 'Paid amount', pay: '$25' },
    ]
    this.userDeatils = {
      userName: 'Esther Berry',
      userImage: '../../assets/user.jpeg',
      paymentType: 'Apple pay',
      coupon: 'Discount',
      price: '$25',
      distance: 2.2,
      pickupLocation: '7958 Swift Village',
      dropOffLocation: '105 William, US',
      checked: false
    }

  }

  getnavigations() {
    console.log('navigations')
    const coords = this.act_route.params.subscribe(params => {
      this.driverOrigin = params['driverOrigin'];
      this.userOrigin = params['userOrigin'];
    });
    const options: LaunchNavigatorOptions = {
      start: this.driverOrigin,
      app: this.launchNavigator.APP.GOOGLE_MAPS,
    }

    this.launchNavigator.navigate(this.userOrigin, options)
      .then(
        success => console.log('Launched navigator', success),
        error => console.log('Error launching navigator', error)
      );
  }

  userCall() {
    console.log('call');
    this.callNumber.callNumber('18001010101', true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  userMessage() {
    console.log('user Message');
    this.route.navigate(['chat'])

  }

  async userCancel() {
    console.log('user cancel');
    const alert = await this.alertController.create({
      header: 'Cancel Request',
      message: 'Are you sure you want to cancel this request',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.route.navigate(['customerRequest']);
          }
        }
      ]
    });

    await alert.present();

  }

  pickupPage() {
    console.log('pickup Page');
    this.getnavigations();

  }

}
