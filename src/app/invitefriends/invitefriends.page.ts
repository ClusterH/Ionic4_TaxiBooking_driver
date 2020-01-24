/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */



import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-invitefriends',
  templateUrl: './invitefriends.page.html',
  styleUrls: ['./invitefriends.page.scss'],
})
export class InvitefriendsPage implements OnInit {
  userCard: { 'name': string; 'image': string; 'button1': string; }[];

  constructor(public actionSheetController: ActionSheetController, private socialSharing: SocialSharing) {
    this.userCard = [{
      'name': 'Elva Barnet',
      'image': '../../assets/img/user1.jpeg',
      'button1': '5 mutual friends',
    }, {
      'name': 'Andre Clark',
      'image': '../../assets/img/user2.jpeg',
      'button1': '5 mutual friends',

    }, {
      'name': 'Elva Barnet',
      'image': '../../assets/img/user3.jpeg',
      'button1': '5 mutual friends',

    }, {
      'name': 'Elva Barnet',
      'image': '../../assets/img/user1.jpeg',
      'button1': '5 mutual friends',

    }, {
      'name': 'Elva Barnet',
      'image': '../../assets/img/user2.jpeg',
      'button1': '5 mutual friends',

    }, {
      'name': 'Andre Clark',
      'image': '../../assets/img/user3.jpeg',
      'button1': '5 mutual friends',
    }]
  }

  ngOnInit() {
  }

  shareAlert() {
    this.socialSharing.share();

  }

}
