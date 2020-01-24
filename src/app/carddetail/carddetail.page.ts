
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
  selector: 'app-carddetail',
  templateUrl: './carddetail.page.html',
  styleUrls: ['./carddetail.page.scss'],
})
export class CarddetailPage implements OnInit {
  userCard: { 'name': string; 'amount': string; 'image': string; 'button1': string; 'button2': string; 'km': string; 'pickup': string; 'drop': string; 'noted': string; 'applePay': string; 'discount': string; 'paidamount': string; }[];
 
  constructor() {
  this.userCard = [{
    'name': 'Elva Barnet',
    'amount': '$22.50',
    'image': '../../assets/img/user1.jpeg',
    'button1': 'ApplePay',
    'button2': 'Discount',
    'km': '7.2 km',
    'pickup': '7958 Swift Village',
    'drop': '105 William St,Chicago,US',
    'noted': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, vero recusandae labore unde accusantium cumque molestias voluptatem officia iure maxime iusto qui, quam ea iste. Sed fugit quisquam dolor obcaecati!',
    'applePay': '$15.00',
    'discount': '$25.00',
    'paidamount':'$07.00',
    }]
  }

  ngOnInit() {
  }

}
