/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { ViewController } from '@ionic/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { DriverStatusService } from '../driver-status.service';

@Component({
  selector: 'app-customer-request',
  templateUrl: './customer-request.page.html',
  styleUrls: ['./customer-request.page.scss'],
})
export class CustomerRequestPage implements OnInit {

  public userRequests: Array<any> = [];
  public acceptRideToggle: boolean = false;

  constructor(public modalController: ModalController, 
    public navCtrl:NavController, 
    public router:Router, 
    public location: Location,
    public driverService:DriverStatusService) { }

  ngOnInit() {
    this.userRequests = [
      {
        userName:'John Deo',
        userImage:'../../assets/user.jpeg',
        paymentType:'Apple pay',
        coupon:'Discount',
        price:'$25',
        distance:2.2,
        pickupLocation:'7958 Swift Village',
        dropOffLocation:'105 William, US',
        checked: false
      },
      {
        userName:'Esther Berry',
        userImage:'../../assets/user3.jpeg',
        paymentType:'Apple pay',
        coupon:'Discount',
        price:'$35',
        distance:3,
        pickupLocation:'7958 Swift Village',
        dropOffLocation:'105 William, US',
        checked: false
      },
      {
        userName:'Esther Berry',
        userImage:'../../assets/user1.jpeg',
        paymentType:'Apple pay',
        coupon:'Discount',
        price:'$50',
        distance:5,
        pickupLocation:'7958 Swift Village',
        dropOffLocation:'105 William, US',
        checked: false
      },
      {
        userName:'Johnny Deo',
        userImage:'../../assets/user3.jpeg',
        paymentType:'Apple pay',
        coupon:'Discount',
        price:'$60',
        distance:6,
        pickupLocation:'7958 Swift Village',
        dropOffLocation:'105 William, US',
        checked: false
      },
      {
        userName:'Zach Deo',
        userImage:'../../assets/user2.jpeg',
        paymentType:'Apple pay',
        coupon:'Discount',
        price:'$30',
        distance:3.1,
        pickupLocation:'7958 Swift Village',
        dropOffLocation:'105 William, US',
        checked: false
      },

    ]
  }

  userRiderDetails(index){
    console.log(index)
  
    this.userRequests.map((el,i) => {
      if (index === i) {
        this.userRequests[index].checked = ! this.userRequests[index].checked
      } else {
        el.checked = false
      }
    
      
     });
  }

  requestAccept(){
    this.driverService.userCard = true;
    this.router.navigate(['home',{userCard:true}])
    // this.modalController.dismiss();
  }
  requestCancel(){
    this.driverService.userCard = false;
    this.router.navigate(['home',{userCard:false}])
  }


}
