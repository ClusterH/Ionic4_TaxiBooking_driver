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
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from '../firestore.service';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';



@Component({
  selector: 'app-addnewvehicle',
  templateUrl: './addnewvehicle.page.html',
  styleUrls: ['./addnewvehicle.page.scss'],
})
export class AddnewvehiclePage implements OnInit {
  private user: any;
  models: any;
  validations_form: FormGroup;
  spinner: boolean = false;
  disabled: boolean = false;
  errorMessage: string = '';

  public year_data = [
    '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'
  ];
   
  public color_data = [
    'Black', 'Yellow', 'Red', 'White'
  ];
  
  public booking_type_data = [
    'Taxi 7 seat', 'Taxi 9 seat', 'Cab 4 seat', 'Auto-Rikshaw', 'E-Rikshaw',
  ];

  constructor(
    public route: Router,
    public navctrl: NavController,
    private afs: AngularFirestore,
    private firestore: FirestoreService,
    private auth: AuthService,
    public util: UtilService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.models = this.afs.collection('models').valueChanges();
    this.user = this.auth.loggedInUser;

    this.validations_form = this.formBuilder.group({
      vehicle_info: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      year_info: new FormControl('', Validators.compose([
        Validators.required
      ])),
      color_info: new FormControl('', Validators.compose([
        Validators.required
      ])),
      booking_type_info: new FormControl('', Validators.compose([
        Validators.required
      ])),
      license_info: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    console.log('models:', this.models);
  }
 
  completeAddVehicle(value) {
    this.spinner = true;
    this.disabled = true;
    
    console.log(value);
    this.firestore.update('drivers', this.user.id, value).then(data => {
      console.log(data);
      this.util.presentToast('vehicle added', true, 'bottom', 2100);
      this.spinner = false;
      this.disabled = false;
      // this.navctrl.back();
      this.route.navigate(['vehiclemanagement'])
    })
      .catch(err => {
        this.spinner = false;
        this.disabled = false;
        console.log(err.message);
        this.errorMessage = err.message;
      });
  }
}


