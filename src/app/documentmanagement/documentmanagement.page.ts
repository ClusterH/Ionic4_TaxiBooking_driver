/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-documentmanagement',
//   templateUrl: './documentmanagement.page.html',
//   styleUrls: ['./documentmanagement.page.scss'],
// })
// export class DocumentmanagementPage implements OnInit {
//   public documents = [{
//     'name': 'Identification Card',
//     'icon': 'person',
//     'url':'/drivinglicense'
//   }, {
//       'name': 'Driving License',
//       'icon': 'person',
//       'url': '/drivinglicense'
//     }]
//   constructor(public route:Router) { }

//   ngOnInit() {
//   }
//   gotoPage(item: any) {
//     this.route.navigate([item])

//   }
// }

/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../firestore.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UUID } from 'angular2-uuid';
import { UtilService } from '../util.service';
import { StorageService } from '../filestorage.service';


@Component({
  selector: 'app-documentmanagement',
  templateUrl: './documentmanagement.page.html',
  styleUrls: ['./documentmanagement.page.scss'],
})
export class DocumentmanagementPage implements OnInit {
  // customAlertOptions: any = {
  //   header: 'Pizza Toppings',
  //   subHeader: 'Select your toppings',
  //   message: '$1.00 per topping',
  //   translucent: true
  // };
  // customPopoverOptions: any = {
  //   header: 'Hair Color',
  //   subHeader: 'Select your hair color',
  //   message: 'Only select your dominant hair color'
  // };
  
  user: any;
  driver_info: any = {};
  vehicle_ability_info: any = {};
  driver_license_approve: boolean = false;
  driver_license_img: any;
  
  constructor(
    public modalCtrl: ModalController,
    public nativePageTransitions: NativePageTransitions,
    public route: Router,
    private afs: AngularFirestore,
    private auth: AuthService,
    private firestoreservice: FirestoreService,

    public actionCtrl: ActionSheetController,
    public util: UtilService,
    public camera: Camera,
    public navCtrl: NavController,
    private storageServ: StorageService,
    private firestore: FirestoreService
  ) { }

  ngOnInit() {
    this.user = this.auth.loggedInUser;
  }

  dismiss() {
    this.navCtrl.back();
  }

  updateProfile() {
    this.navCtrl.back();
  }

  ionViewWillEnter() {
    this.firestoreservice.currencyFilter.subscribe(res => {
      this.driver_info = {
        avata_img: res.profileImg,
        name: res.name,
        license_img: res.driver_license_img,
        license_approve: res.driver_license_approve
      }
      
      console.log(res);
    });
    
  }

  async editPhoto() {
    const action = await this.actionCtrl.create({
      buttons: [{
        text: 'Take a picture',
        role: 'destructive',
        cssClass: 'buttonCss',
        handler: () => {
          this.openCamera();
          console.log('Take a picture clicked');
        }
      }, {
        text: 'Choose a picture',
        handler: () => {
          this.openGallery();
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'buttonCss_Cancel',

        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await action.present();
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((url) => {
      const name = UUID.UUID();
      // let name = url.split('/');
      this.util.makeFileIntoBlob(url, name).then(imageData => {
        this.util.openInfLoader();
        this.storageServ.uploadContent(imageData, name).then(
          success => {
            this.util.closeLoading()
            this.util.presentToast('image uploded', true, 'bottom', 2100);
            console.log('success', success);
            this.driver_license_img = success.url;
            this.updateDriverLicense();
          }

        ).catch(err => {
          this.util.closeLoading();
          this.util.presentToast(`${err}`, true, 'bottom', 2100);
          console.log('err', err);
        })
      })
    }).catch(err => { });
  }
  public openGallery() {
    const options: CameraOptions = {
      quality: 60,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((url) => {
      const name = UUID.UUID();
      this.util.makeFileIntoBlob(url, name).then(imageData => {

        this.util.openInfLoader();
        this.storageServ.uploadContent(imageData, name).then(
          success => {
            this.util.closeLoading()
            this.util.presentToast('image uploded', true, 'bottom', 2100);
            console.log('success', success);
            // this.driver_license_approve = true;
            this.auth.loggedInUser.driver_license_Img = success.url;
            this.driver_license_img = success.url;
            this.updateDriverLicense();
          }
        ).catch(err => {
          this.util.closeLoading();
          this.util.presentToast(`${err}`, true, 'bottom', 2100);
          console.log('err', err);
        });
      });
    }).catch(err => {
      console.log('errrrr', err);
    });
  }

  updateDriverLicense() {
    this.driver_license_approve = true;

    const update = {
      driver_license_img: this.driver_license_img,
      driver_license_approve: this.driver_license_approve
    }

    this.firestore.update('drivers', this.user.id, update).then(data => {
      console.log(data);
      this.util.presentToast('Profile updated', true, 'bottom', 2100);
    })
  }


  // openpageTRansition() {
  //   this.route.navigate(['addnewvehicle']);
  // }
  
}

