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
import { Platform, MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  public lat: number;
  public long: number;

  constructor(private route: Router, public platform: Platform, private geolocation: Geolocation,private menuCtrl:MenuController ) {
    this.menuCtrl.enable(false);
    
  }

  ngOnInit() {
  }

  locationTracking() {
    if (this.platform.is('cordova')) {
      console.log('cordova valid');
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log('resp', resp)
        this.route.navigate(['register'])
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  
      const watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        console.log('data', data);
      });
    } else {
      console.log('not Cordova')
      this.route.navigate(['register'])
    }


  }

  skip() {
    this.route.navigate(['register'])
  }


}
