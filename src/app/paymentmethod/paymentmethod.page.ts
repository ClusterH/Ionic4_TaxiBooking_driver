
/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.page.html',
  styleUrls: ['./paymentmethod.page.scss'],
})
export class PaymentmethodPage implements OnInit {
  data: { 'type': string; 'amount': string; 'image': string; }[];

  constructor() {
  this.data = [{
    'type': 'VISA',
    'amount': '************3765',
    'image': '../../assets/img/visa.png'
  }, {
    'type': 'Paypal',
    'amount': '************3765',
      'image': '../../assets/img/paypal.png'
  }, {
    'type': 'Master Card',
    'amount': '************3765',
      'image': '../../assets/img/mastercard.png'
  }, {
    'type': 'Paytm',
    'amount': '************3765',
    'image': '../../assets/img/dollar.png'
    }, {
      'type': 'Cash',
      'amount': '************3765',
      'image': '../../assets/img/paypal.png'
    }]
 }

  ngOnInit() {
  }

}
