/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Wallet',
      url: '/wallet',
      icon: 'wallet'
    },
    {
      title: 'History',
      url: '/history',
      icon: 'time'
    },
    { title: 'Notifications', url: '/notifications', icon: 'notifications' },
    {
      title: 'Invite Friends',
      url: '/invite',
      icon: 'gift'
    },
    {
      title: 'Settings',
      url: '/setting',
      icon: 'settings'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route: Router,
    private auth: AuthService
  ) {
    this.initializeApp();
    this.auth.user.subscribe(res => {
      if (res) {
        this.auth.getUser(res.uid).then((user: any) => {
          console.log(user);
          this.auth.setLoggedInUser(res, user);
        });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  profile() {
    this.route.navigate(['profile']);
  }

  checkPage(page) {
    if (page.title === 'Logout') {
      this.auth.logout().then(res => {
        this.route.navigate(['login']);
      });
    } else {
      this.route.navigate([page.url]);
    }
  }
}
