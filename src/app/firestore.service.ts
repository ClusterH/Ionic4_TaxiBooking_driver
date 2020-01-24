/**
* Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/

import { BaseDatabaseModel } from './base-dto.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  userid: any;
  private filterCurrency = new BehaviorSubject<any>('');
  currencyFilter = this.filterCurrency.asObservable();
  constructor(private db: AngularFirestore,
    public store: AngularFirestore,
    private util: UtilService) {
    this.util.userid.subscribe(res => {
      this.userid = res;
    })
  }
  updateDriverData(coords: object, uid: string) {
    this.db
      .collection('drivers')
      .doc(uid)
      .update({
        location: coords
      })
      .then(blah => {
        console.log('updated');
      })
      .catch(err => console.log(err));
  }

  checkUpdate(uid) {
    console.log(uid, 'uid');
    return new Observable(observer => {
      const { next, error } = observer;
      this.db
        .collection('drivers')
        .doc(uid)
        .valueChanges()
        .subscribe((data) => {
          this.filterCurrency.next(data);
          console.log(data);
        });
    });
  }

  changeStatus(status, uid): Promise<any> {
    this.db
      .collection('drivers')
      .doc(uid)
      .update({
        available: status
      })

    return new Promise(resolve => {
      const data = this.db
        .collection('drivers')
        .doc(uid)
        .valueChanges()
        .subscribe()
      console.log(data);
      resolve(data);
    });
  }

  public create<T extends BaseDatabaseModel>(collection: string, data: T): Promise<void> {
    return this.store.doc<T>(`${collection}/${data.id}`).set(data);
  }

  public get<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
    return this.store.collection<T>(collection, ref => ref.where('uid', '==', `${this.userid}`)).valueChanges();
  }

  public getOne<T extends BaseDatabaseModel>(collection: string, id: string): Observable<T> {
    return this.store.doc<T>(`${collection}/${id}`).valueChanges();
  }

  public update<T extends BaseDatabaseModel>(collection: string, id: string, document): Promise<void> {
    return this.store.doc<T>(`${collection}/${id}`).update(document);
  }

  public runQuery<T extends BaseDatabaseModel>(collection: string, query: FirestoreQuery): Observable<T[]> {
    return this.store.collection<T>(collection, ref => ref.where(query.field, query.operation, query.searchKey)).valueChanges();
  }

  public delete<T extends BaseDatabaseModel>(collection: string, id: string): Promise<any> {
    return this.store.doc<T>(`${collection}/${id}`).delete();
  }

  public uploadFile(folderName: string, downloadUrl: string, fileName: string): Promise<any> {
    return this.store.collection<{ downloadUrl: string, fileName: string, uid: string }>(`fileReferences`).add({ downloadUrl: downloadUrl, fileName: fileName, uid: this.userid });
  }
  public getImages(): Observable<any> {
    return this.store.collection('fileReferences', ref => ref.where('uid', '==', `${this.userid}`)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }

}

export interface FirestoreQuery {
  field: string;
  operation: firebase.firestore.WhereFilterOp;
  searchKey: string;
}