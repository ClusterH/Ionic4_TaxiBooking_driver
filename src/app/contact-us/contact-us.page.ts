/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUSPage implements OnInit {
  public contactUS = [
    {
      title: 'https://store.enappd.com/',
      imageUrl: '../../assets/enappd-logo-BLUE.png',
      titleUrl: 'https://store.enappd.com/',
      color: '#000'
    },
    {
      title: 'admin@enappd.com',
      iconUrl: 'mail',
      color: '#dd4b39'
     
    },
    {
      title: '+91-820 931 3520',
      iconUrl: 'call',
      color: '#000'    
    },
    {
      title: '/EnappdStore',
      iconUrl: 'logo-facebook',
      titleUrl:'https://m.facebook.com/EnappdStore/',
      color:'#3C5A99'
    },
    {
      title: '/Enappd',
      iconUrl: 'logo-instagram',
      titleUrl:'https://www.instagram.com/Enappd/',
      color:'#e4405f'
    },
  ]
  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
  }

  openUrl(url) {
    const browser = this.iab.create(url);
    window.open(url);
  }

}
