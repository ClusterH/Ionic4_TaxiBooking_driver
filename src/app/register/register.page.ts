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
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  public email: string;
  public password: string;
  public name: string;
  spinner: boolean = false;
  disabled: boolean = false;

  constructor(
    private route: Router,
    private menuCtrl: MenuController,
    private auth: AuthService,
    public toastController: ToastController
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.auth.user.subscribe(res => {
      if (res && res.uid) {
        console.log(res)
        this.auth.getUser(res.uid).then(user => {
          this.auth.setLoggedInUser(res, user);

          this.spinner = false;
          this.disabled = false;
          if (user['approved'] === false) {
            this.route.navigate(['approved']);
          } else {
            this.route.navigate(['home']);
          }
        });
      }
    });
  }

  register() {
    this.spinner = true;
    this.disabled = true;
    this.auth
      .signupUser(this.email, this.password)
      .then(res => {
        console.log(res);
        this.auth.writeNewUser(this.email, res.user.uid, this.name)
          .then(response => {
            this.auth.getUser(res.user.uid).then(user => {
              this.auth.setLoggedInUser(res, user);

              this.spinner = false;
              this.disabled = false;
              this.route.navigate(['approved']);
            });
          })
      })
      .catch(async err => {
        const toast = await this.toastController.create({
          header: 'Authentication Error',
          message: err.message,
          position: 'bottom',
          buttons: [{
            text: 'Okey',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
          ]
        });
        toast.present();
        this.spinner = false;
        this.disabled = false;
        console.log(err.message);
      });
    // this.route.navigate(['verify-otp']);
  }

  login() {
    this.route.navigate(['login']);
  }
}
