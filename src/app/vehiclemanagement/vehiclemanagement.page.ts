/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../firestore.service';


@Component({
  selector: 'app-vehiclemanagement',
  templateUrl: './vehiclemanagement.page.html',
  styleUrls: ['./vehiclemanagement.page.scss'],
})
export class VehiclemanagementPage implements OnInit {
  customAlertOptions: any = {
    header: 'Pizza Toppings',
    subHeader: 'Select your toppings',
    message: '$1.00 per topping',
    translucent: true
  };
  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };
  
  user: any;
  driver_info: any = {};
  vehicle_ability_info: any = {};
  
  constructor(
    public modalCtrl: ModalController,
    public nativePageTransitions: NativePageTransitions,
    public route: Router,
    private afs: AngularFirestore,
    private auth: AuthService,
    private firestoreservice: FirestoreService,
  ) { }

  ngOnInit() {
    this.user = this.auth.loggedInUser;
  }
  ionViewWillEnter() {
    this.firestoreservice.currencyFilter.subscribe(res => {
      this.driver_info = {
        avata_img: res.profileImg,
        name: res.name,
        license: res.license_info,
        // brand: res.vehicle_info.split(" ")[0],
        model: res.vehicle_info,
        color: res.color_info,
      }
      
      console.log(res);
    });

    let temp = this.afs.collection("models", ref=> ref.where("model", "==", this.driver_info.model)).valueChanges();
    console.log(temp);
    temp.forEach((doc) => {
      console.log(doc);
      doc.filter((item: any) => {
        console.log(item.model);
        if(item.model === this.driver_info.model) {
          this.vehicle_ability_info = {
            speed: item.speed,
            price: item.price,
            member: item.member,
            model_img: item.img_path,
          }
          this.firestoreservice.update('drivers', this.user.id, this.vehicle_ability_info).then(data => {
            console.log(data);
          });
          console.log(this.vehicle_ability_info);
        }
      })
    })

  }
  openpageTRansition() {
    this.route.navigate(['addnewvehicle']);
  }
  
}
