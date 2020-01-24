/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UUID } from 'angular2-uuid';
import { UtilService } from '../util.service';
import { StorageService } from '../filestorage.service';
import { FirestoreService } from '../firestore.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  photos: any = [];
  user: any;
  constructor(
    private auth: AuthService,
    public actionCtrl: ActionSheetController,
    public util: UtilService,
    public camera: Camera,
    public navCtrl: NavController,
    private storageServ: StorageService,
    private firestore: FirestoreService) { }

  ngOnInit() {
    this.user = this.auth.loggedInUser;
  }

  dismiss() {
    this.navCtrl.back();
  }

  updateProfile() {
    this.navCtrl.back();
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
            this.auth.loggedInUser.profileImg = success.url;
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
            this.auth.loggedInUser.profileImg = success.url;
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
  updateProfileDetails() {
    if (!this.user.name) {
      this.util.presentToast('Name cannot be empty', true, 'bottom', 2100);
      return;
    }
    if (!this.user.email) {
      this.util.presentToast('Email cannot be empty', true, 'bottom', 2100);
      return;
    }
    const update = {
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      gender: this.user.gender,
      birthday: this.user.birthday,
      profileImg: this.user.profileImg
    }
    console.log('id', this.user.id);
    this.firestore.update('drivers', this.user.id, update).then(data => {
      console.log(data);
      this.util.presentToast('Profile updated', true, 'bottom', 2100);
      this.navCtrl.back();
    })
  }

}
