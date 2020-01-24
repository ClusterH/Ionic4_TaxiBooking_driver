/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { DriverStatusService } from '../driver-status.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss']
})
export class HistoryPage implements OnInit {
  // weekDays: any;
  segmenValue: any;
  starsCount: number;

  clicked: any;
  userCard: any = [];
  selected: any;
  origin: any;
  destination: any;
  user: any;
  pastRides: any = [];
  upcomingRides: any = [];
  did: any;
  totalEarning: any = 0;
  totalTripCounter: any = 0;

  loader: any;
  constructor(
    private fire: FirestoreService,
    private afs: AngularFirestore,
    private auth: AuthService,
    public driverService: DriverStatusService
  ) {
    
    this.userCard = [
      {
        name: 'Elva Barnet',
        amount: '$22.50',
        image: '../../assets/img/user1.jpeg',
        button1: 'ApplePay',
        button2: 'Discount',
        km: '7.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      },
      {
        name: 'Andre Clark',
        amount: '$28.50',
        image: '../../assets/img/user2.jpeg',
        button1: 'ApplePay',
        km: '4.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      },
      {
        name: 'Elva Barnet',
        amount: '$28.50',
        image: '../../assets/img/user3.jpeg',
        button1: 'ApplePay',
        km: '1.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      },
      {
        name: 'Elva Barnet',
        amount: '$25.50',
        image: '../../assets/img/user1.jpeg',
        button1: 'ApplePay',
        button2: 'Discount',
        km: '2.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      },
      {
        name: 'Elva Barnet',
        amount: '$20.50',
        image: '../../assets/img/user2.jpeg',
        button1: 'ApplePay',
        km: '6.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      },
      {
        name: 'Andre Clark',
        amount: '$21.50',
        image: '../../assets/img/user3.jpeg',
        button1: 'ApplePay',
        button2: 'Discount',
        km: '1.2km',
        pickup: '7958 Swift Village',
        drop: '105 William St,Chicago,US'
      }
    ];
  }
  ngOnInit() {
    // this.selected = this.weekDays[0];
    this.auth.user.subscribe(res => {
      this.did = res.uid;
      this.totalTripCounter = 0;
      this.segmenValue = 'past';
      this.getHistory();
    });

  }

  async getHistory() {
    if (!this.loader) {
      this.loader = await this.driverService.loading('Loading history ...');
      this.loader.present();
    }
    this.afs
      .collection('completedRides', ref =>
        ref.where('driver', '==', `${this.did}`).orderBy('date')
      )
      .valueChanges()
      .subscribe((res: any) => {
        // this.pastRides = res;
        for (let i = 0; i < res.length; i++) {
          if(!res[i].schedule) {
            this.pastRides.push(res[i]);
            console.log(res[i]);
            this.totalEarning = this.totalEarning + parseInt(res[i].fare,10);
            this.totalTripCounter++;

          } else {
            this.upcomingRides.push(res[i]);
            console.log(res[i]);

          }
        };
        this.loader.dismiss();
      });
  }

  segmentValue(event: any) {
    this.segmenValue = event.detail.value;
  }
}
