/**
*Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

import { AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject<any>('');
  driversCollectionReference: AngularFirestoreCollection<any>;
  loggedInUser: any = {
    id: '',
    name: '',
    email: '',
    profileImg: '',
    // driver_license_Img: '',
    location: ''
  };
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.checkUser();
  }

  setLoggedInUser(res, user) {
    console.log(this.loggedInUser);
    this.loggedInUser.id = res.uid;
    this.loggedInUser.phone = user.phone ? user.phone : '';
    this.loggedInUser.name = user.name;
    this.loggedInUser.email = user.email;
    this.loggedInUser.gender = user.gender ? user.gender : '';
    this.loggedInUser.memberType = user.memberType ? user.memberType : 'Regular';
    this.loggedInUser.birthday = user.birthday ? user.birthday : '';
    this.loggedInUser.profileImg = user.profileImg ? user.profileImg : '';
    console.log(this.loggedInUser);
  }

  signupUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
  }

  writeNewUser(email: string, uid: string, name: string): Promise<any> {
    console.log(uid, email)
    return this.db
      .collection('drivers')
      .doc(uid)
      .set({
        email: email,
        available: false,
        approved: false,
        name: name
      });

  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
  }

  checkUser() {
    this.afAuth.auth.onAuthStateChanged(user => {
      this.user.next(user);
    });
  }

  getUser(uid) {
    const docRef = this.db.collection('drivers').doc(uid).ref;
    return new Promise(resolve => {
      const data = docRef.get().then(doc => {
        console.log(doc.data());
        resolve(doc.data());
      }).catch((e) => {
        console.log('error getting document', e);
        resolve(e);
      })

    });
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
}
