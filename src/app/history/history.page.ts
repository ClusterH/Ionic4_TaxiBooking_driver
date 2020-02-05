/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { ModalPage } from '../modal/modal.page';
import { DriverStatusService } from '../driver-status.service';
import { ActivatedRoute } from '@angular/router';

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
    public modalController: ModalController,
    private afs: AngularFirestore,
    private auth: AuthService,
    public driverService: DriverStatusService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.selected = this.weekDays[0];
    this.auth.user.subscribe(res => {
      this.did = res.uid;
      this.totalTripCounter = 0;

      this.route.params.subscribe(params => {
        console.log(params);
        if (params && params.status == 'upcoming') {
          this.segmenValue = 'upcoming';
        } else {
          this.segmenValue = 'past';
        }
      })
      
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

  async showInfo(ride) {
    console.log(ride);
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { rideInfo: ride }
    });
    return await modal.present();
  }
}
