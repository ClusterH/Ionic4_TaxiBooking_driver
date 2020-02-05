/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ModalController,
  MenuController,
  AlertController,
  NavParams,
  LoadingController
} from '@ionic/angular';
import { CustomerRequestPage } from '../customer-request/customer-request.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DriverStatusService } from '../driver-status.service';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../firestore.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public zoom: number = 12;
  public lat: number =0;
  public lng: number =0;
  public markerUrl = '../../assets/markerPin.png';
  public driveStatus: boolean = false;
  public origin: any;
  public destination: any;
  public userId: any;
  public userData: any; // user data
  public locationOrigin: any; // driver location on ngOnInit
  public customerId: any; // customer id here
  private rideAlert: any;
  timeout: any;
  loader: any;
  rides: any;
  did: any;
  totalEarning: any = 0;
  totalDistance: any = 0;
  totalDuration: any = 0;
  totalTripCounter: number = 0;
  totalUpcomingCounter: number = 0;
  totalHour: number;
  totalMin: number;
  totalRating: number;
  scheduleDate: any;
  scheduleRide: any;

  public renderOpts = {
    suppressMarkers: true
  };
  public directionOptions = {
    origin: {
      icon: '../../assets/Google-Car.png'
    },
    destination: {
      icon: '../../assets/distinationsMaker.png',
      opacity: 0.8
    }
  };

  constructor(
    private router: Router,
    public modalController: ModalController,
    private geolocation: Geolocation,
    private menuCtrl: MenuController,
    public alertController: AlertController,
    private activeRouter: ActivatedRoute,
    public driverService: DriverStatusService,
    private auth: AuthService,
    public loadingCtrl: LoadingController,
    private fire: FirestoreService,
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    public afs: AngularFirestore,
  ) {
    console.log(driverService.driverStatus);
    this.driveStatus = driverService.driverStatus;
    console.log('construct');

  }

  ngOnInit() {
    // this.getcurrentLocations();
    // this.getDirection();
    console.log('ngonit');

    this.auth.user.subscribe(res => {
      console.log(res);
      this.did = res.uid;
      this.totalDuration = 0;
      this.totalTripCounter = 0;
      this.totalUpcomingCounter = 0;
      this.totalEarning = 0;
      this.totalHour = 0;
      this.totalMin = 0;
      this.totalDistance = 0;
      this.totalRating = 0;
      this.rideAlert = null;
      this.scheduleRide = null;
      this.scheduleDate = null;
      this.customerId = null;
      this.reset();

    console.log(this.rideAlert);
      
      // this.getHistory();
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user);
      this.userId = user.uid;
      this.getcurrentLocations();
      this.fire.currencyFilter.subscribe(res => {
        console.log(res);
        if (res && !this.driverService.rideInProgress) {
          const checkRide = res['requestRide'];
          const available = res['available'];
          this.scheduleRide = res['scheduleRide'];
          this.scheduleDate = res['scheduleDate'];

          console.log(this.scheduleRide, this.scheduleDate);

          this.driveStatus = available;

          if (checkRide === true && available) {
            if ( !this.scheduleRide && this.scheduleDate === null) {
              console.log("true ScheduleRide", this.scheduleRide);
              this.openAction(res);
            } else if (this.scheduleRide && this.scheduleDate !== null) {
              console.log("true ScheduleRide", this.scheduleRide);
              this.openActionScheduleRide(res);
            }
          }
        }
      })
      if (user) {
        this.fire.checkUpdate(user.uid).subscribe(res => {
          console.log(res);
        });
      }

    });
  }
  reset() {
    this.totalDuration = 0;
    this.totalTripCounter = 0;
    this.totalEarning = 0;
    this.totalHour = 0;
    this.totalMin = 0;
    this.totalDistance = 0;
    this.totalRating = 0;
    this.totalUpcomingCounter = 0;
    this.rideAlert = null;
    this.scheduleRide = null;
    this.scheduleDate = null;
    this.customerId = null;
    this.getcurrentLocations();
    this.getDirection();
    this.getHistory();
  }

  driverNotResponding(customerId) {
    // const obj = {};
    console.log(customerId);
    // obj['uid'] = customerId;
    
    this.http
      .post(
        'https://us-central1-iondriverhapp.cloudfunctions.net/drivernotRespond',
        { userid: this.userId, custId: this.customerId }
      )
      .subscribe(async (res: any) => {
        console.log(res);
        if (res && res.status === 'ignored') {
          this.rideAlert.dismiss();
          this.rideAlert = null;
          this.scheduleRide = false;
        }
      });
  }

  async openAction(res) {
    this.customerId = res.requestedUser;
    console.log(this.customerId);
    this.timeout = setTimeout(() => {
      this.driverNotResponding(this.customerId);
    }, 30000);

    if (!this.rideAlert) {
      this.rideAlert = await this.alertController.create({
        header: 'Alert!',
        // message: 'Schedule: ' + this.scheduleDate,
        message: 'New Ride Available!',
        buttons: [
          {
            text: 'Reject',
            role: 'cancel',
            cssClass: 'secondary',
            handler: async blah => {
              // reject ride firebase function
              clearTimeout(this.timeout);
              const loader = await this.loadingCtrl.create({
                message: 'Please wait...',
              });
              loader.present();
              this.http
                .post(
                  'https://us-central1-iondriverhapp.cloudfunctions.net/rejectRide',
                  { userid: this.userId, custId: this.customerId }
                )
                .subscribe(res => {
                  loader.dismiss();
                  this.driverService.rideInProgress = false;
                  this.rideAlert = null;
                  console.log(res);
                });
            }
          },
          {
            text: 'Accept',
            handler: async () => {
              // accept ride firebase function
              clearTimeout(this.timeout);
              const loader = await this.loadingCtrl.create({
                message: 'Please wait...',
              });
              loader.present();
              this.http
                .post(
                  'https://us-central1-iondriverhapp.cloudfunctions.net/acceptRide',
                  { custId: this.customerId }
                )
                .subscribe(res => {
                  console.log('Res', res)
                  // const parsedObj = JSON.parse(res['_body']);
                  const parsedObj = res;
                  console.log(parsedObj);
                  loader.dismiss();
                  this.driverService.rideInProgress = true;
                  this.rideAlert = null;
                  this.userData = parsedObj;
                });
            }
          }
        ]
      });
    } 

    await this.rideAlert.present();
  }

  async openActionScheduleRide(res) {
    this.customerId = res.requestedUser;
    console.log(this.customerId);
    this.timeout = setTimeout(() => {
      this.driverNotResponding(this.customerId);
    }, 30000);

    if (!this.rideAlert && this.scheduleDate !== null) {
      // this.afs.collection("customers").doc(this.customerId).valueChanges().subscribe((res: any) => {
      //   console.log(res);
      //   this.scheduleDate = res.tripSchedule;
      //   // this.scheduleRide = res.scheduleRide;
      //   console.log( this.scheduleDate);
      // });

      this.rideAlert = await this.alertController.create({
        header: 'Alert!',
        message: 'Schedule: ' + this.scheduleDate,
        buttons: [
          {
            text: 'Reject',
            role: 'cancel',
            cssClass: 'secondary',
            handler: async blah => {
              // reject ride firebase function
              clearTimeout(this.timeout);
              const loader = await this.loadingCtrl.create({
                message: 'Please wait...',
              });
              loader.present();
              this.http
                .post(
                  'https://us-central1-iondriverhapp.cloudfunctions.net/rejectRide',
                  { userid: this.userId, custId: this.customerId }
                )
                .subscribe(res => {
                  loader.dismiss();
                  this.driverService.rideInProgress = false;
                  this.rideAlert = null;
                  this.scheduleRide = false;
                
                  console.log(res);
                });
            }
          },
          {
            text: 'Accept',
            handler: async () => {
              // accept ride firebase function
              clearTimeout(this.timeout);
              const loader = await this.loadingCtrl.create({
                message: 'Please wait...',
              });
              loader.present();
              this.http
                .post(
                  'https://us-central1-iondriverhapp.cloudfunctions.net/acceptRide',
                  { custId: this.customerId }
                )
                .subscribe(res => {
                  console.log('Res', res)
                  // const parsedObj = JSON.parse(res['_body']);
                  const parsedObj = res;
                  console.log(parsedObj);
                  loader.dismiss();
                  this.driverService.rideInProgress = true;
                  this.rideAlert = null;
                  this.userData = parsedObj;
                });
            }
          }
        ]
      });
    } 

    await this.rideAlert.present();

  }

  mapReady(a, event) {
    if (event) {
      console.log('event if');
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log(
      'dragEnd',
      $event,
      '$event.coords.lat',
      $event.coords.lat,
      '$event.coords.lng',
      $event.coords.lng
    );
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  driverStatusChange(event, val) {
    console.log('status', this.driveStatus, event, event.target.value, val);
    this.driverService.driverStatus = this.driveStatus;


    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user)
      this.fire.changeStatus(this.driveStatus, user.uid).then(res => {
        console.log(res);
      });
    });
  }

  goToCustomerDetail() {
    this.router.navigate(['customer-detail', { driverOrigin: this.locationOrigin, userOrigin: this.userData.origin }]);
  }

  getDirection() {
    console.log('directions');
    this.origin = { lat: 25.7657114, lng: -80.335127086 };
    this.destination = { lat: 0.5 + 25.7657114, lng: 0.5 - 80.335127086 };
    console.log('origin', this.origin, this.destination);
  }

  async completeRide() {
    const loader = await this.loadingCtrl.create({
      message: 'Completing your ride ...',
    });
    loader.present();
    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user)
      const obj = {
        driverId: user.uid,
        custId: this.customerId,
        custData: this.userData,
        scheduleRide: false,
        scheduleDate: null,
        moveSchTOPas: false,
      };
      console.log(obj);
      this.http
        .post(
          'https://us-central1-iondriverhapp.cloudfunctions.net/completeRide',
          obj)
        .subscribe((res: any) => {
          console.log(res);
          if (res.status === 'done') {
            this.userData = null;
            this.scheduleRide = false;
            this.scheduleDate = null;
            this.driverService.rideInProgress = false;
            
            this.reset();
          }
          loader.dismiss();
        });
    });

  }

  async uncompletedscheduleRide() {
    const loader = await this.loadingCtrl.create({
      message: 'Completing your ride ...',
    });
    loader.present();
    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user)
      const obj = {
        driverId: user.uid,
        custId: this.customerId,
        custData: this.userData,
        scheduleRide: true,
        scheduleDate: this.scheduleDate,
        moveSchTOPas: false,
      };
      console.log(obj);
      this.http
        .post(
          'https://us-central1-iondriverhapp.cloudfunctions.net/completeRide',
          obj)
        .subscribe((res: any) => {
          console.log(res);
          if (res.status === 'done') {
            this.userData = null;
            this.scheduleRide = false;
            this.scheduleDate = null;

            this.driverService.rideInProgress = false;
            this.reset();

          }
          loader.dismiss();
        });
    });

  }

  showUpcomingRides() {
    this.router.navigate(['history', 'upcoming']);
  }

  requestAccept() {
    this.router.navigate(['customer-detail']);
  }

  async requestIgnore() {
    this.router.navigate(['customerRequest']);
  }

  async getHistory() {
    console.log('getHistory');
    // if (!this.loader) {
    //   this.loader = await this.driverService.loading('Loading history ...');
    //   this.loader.present();
    // }
    this.afs
      .collection('completedRides', ref =>
        ref.where('driver', '==', `${this.did}`)
      )
      .valueChanges()
      .subscribe((res: any) => {
        this.rides = res;
        console.log(this.rides);
        this.totalTripCounter = 0;
        this.totalDistance = 0;
        this.totalDuration = 0;
        this.totalEarning = 0;
        this.totalUpcomingCounter = 0;

        for (let i = 0; i < res.length; i++) {
          if(!res[i].schedule) {
            console.log(res[i].schedule);
            this.totalEarning = this.totalEarning + parseInt(res[i].fare);
            // this.totalDistance = this.totalDistance + parseInt(res[i].tripDistance);
            this.totalDistance = this.totalDistance + parseInt(res[i].tripDistance);
            this.totalDuration = this.totalDuration + parseInt(res[i].tripDuration.split('m')[0]);
            this.totalRating = this.totalRating + parseInt(res[i].rating);
            this.totalTripCounter++;
          } else if (res[i].schedule) {
            this.totalUpcomingCounter++;
          }
        };

        this.totalHour = Math.floor(this.totalDuration/60);
        this.totalMin = Math.abs(this.totalDuration-this.totalHour*60);
        console.log(this.totalHour, this.totalMin, this.totalDuration, this.totalRating, this.totalTripCounter);
        if(this.totalTripCounter === 0) {
          this.totalRating = 0;
        } else {
          // this.totalRating = Number((this.totalRating/this.totalTripCounter).toFixed(1));
          this.totalRating = Math.floor(this.totalRating/this.totalTripCounter);
        }
        let value = {rating: this.totalRating };
        console.log(value);
        this.fire.update('drivers', this.userId, value).then((res) => {
          console.log(res);
        }).catch(err => {
          console.log(err.message);
        });

        // this.loader.dismiss();
      });
  }

  public getcurrentLocations() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        console.log('resp', resp);
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        const obj = {};
        obj['lat'] = Number(this.lat);
        obj['lng'] = Number(this.lng);
        this.locationOrigin = obj;
        const uid = this.userId;
        // update driver's corodinate in the database
        this.fire.updateDriverData(obj, uid);
      })
      .catch(error => {
        console.log('Error getting location', error);
      });
  }
}
