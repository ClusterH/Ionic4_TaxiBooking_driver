
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
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  activeMenu: string;
  user: any;
  constructor(private auth: AuthService, private route: Router, public menu: MenuController) {
    this.user = this.auth.loggedInUser;
    menu.close();
  }

  ngOnInit() {

  }

  editProfile() {
    console.log('eidt Profile')
    this.route.navigate(['edit-profile']);
  }

}
