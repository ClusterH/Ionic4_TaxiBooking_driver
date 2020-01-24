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
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public driverDetails = {};
  public driverDocuments: Array<any> = [];
  public otherDetails: Array<any> = [];

  constructor(public route: Router, private auth: AuthService) { }

  ngOnInit() {
    this.driverDetails = {
      profileImage: '../../assets/driver.jpeg',
      driverName: 'John Deo',
      memberType: 'Gold Member',
      vehicle: [],
      document: [],
      review: ''
    }
    this.driverDocuments = [
      { icon: 'car', title: 'Vehicle Management', background: '#FF9600', page: 'vehiclemanagement' },
      { icon: 'document', title: 'Document Management', background: '#A1EBAE', page: 'documentmanagement' },
      { icon: 'star', title: ' Review Management', background: '#FFD114' },
      { image: '../../assets/worldwide1.png', title: 'Language', background: '#007BFF' },
    ]

    this.otherDetails = [
      { icon: 'notifications', title: 'Notifications', background: '#59CAFA', page: 'notifications' },
      { image: '../../assets/crown.png', title: 'Terms and Privacy Policy', background: '#908F95', page: 'terms-condictions' },
      { icon: 'help-circle-outline', title: 'Contact Us', background: '#FF2954', page: 'contact-us' },
    ]
  }

  goToProfile() {
    console.log('profile Page');
    this.route.navigate(['profile']);
  }
  documentPage(page) {
    if (page) {
      this.route.navigate([page]);
      console.log(page);
    }
  }
  otherPage(page) {
    if (page) {
      this.route.navigate([page]);
    }
  }
}
