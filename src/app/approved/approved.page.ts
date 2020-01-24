/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.page.html',
  styleUrls: ['./approved.page.scss']
})
export class ApprovedPage implements OnInit {
  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
    this.auth.user.subscribe(res => {
      console.log(res);
      if (res.uid) {
        this.auth.getUser(res.uid).then(user => {
          if (user['approved'] === true) {
            this.route.navigate(['home']);
          }
        });
      }
      if (res.email && res.approved) {
        this.route.navigate(['home']);
      }
    });
  }

  logout() {
    this.auth.logout().then(() => {
      this.route.navigate(['login']);
    });
  }
}
