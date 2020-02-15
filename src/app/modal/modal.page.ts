import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController} from '@ionic/angular';
import { RideInfoService } from '../ride-info.service';
import { DriverStatusService } from '../driver-status.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { FirestoreService } from '../firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss']
})
export class ModalPage implements OnInit {
  @Input() rideInfo: any;
  
  public originAddr: any;
  public destinationAddr: any;
  public userData: any; // user data
  public rideId: any;

  public customer: any = {
    profileImg: '',
    email: '',
    name: '',
    phone: '',
  };

  constructor(
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private ride: RideInfoService,
    public driverService: DriverStatusService,
    private router: Router,
    private fire: FirestoreService,
    public store: AngularFirestore,
  ) { }

  ngOnInit() {
    console.log(this.rideInfo);
    this.ride.getCustomer(this.rideInfo).then((res: any) => {
      console.log(res);
      // this.userData = res;
      this.customer = {
        profileImg: res.profileImg,
        name: res.name,
        email: res.email,
        phone: res.phone
      }
      console.log(this.customer);
    });
  }

  startRide() {
    console.log('ok');
    this.http
      .post(
        'https://us-central1-iondriverhapp.cloudfunctions.net/acceptReRide', this.rideInfo)
      .subscribe(res => {
        console.log('Res', res)
        this.userData = res;
        this.userData.tripDistance = this.rideInfo.tripDistance;
        this.userData.tripDuration = this.rideInfo.tripDuration;
        this.userData.estimateFire = this.rideInfo.fare;
        this.userData.origin = this.rideInfo.origin;
        this.userData.destination = this.rideInfo.destination;
        this.userData.startAddress = this.rideInfo.startAddress;
        this.userData.endAddress = this.rideInfo.endAddress;
        this.driverService.rideInProgress = true;
      });
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
        custId: this.rideInfo.customer,
        custData: this.userData,
        scheduleRide: false,
        scheduleDate: null,
        moveSchTOPas: true
      };

      this.store
      .collection('completedRides', ref => ref.where('driver', '==', `${this.rideInfo.driver}`))
      .snapshotChanges()
      .pipe(
        map(response => {
          return response.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      )
      .subscribe(docs => {
        this.rideId = docs;
        for(let i = 0; i < this.rideId.length; i ++) {
          if(this.rideId[i].data.date == this.rideInfo.date) {
            this.fire.delete('completedRides', `${this.rideId[i].id}`).then(res => {
              console.log(res);
            });
          }
        }
      });

      this.http
        .post(
          'https://us-central1-iondriverhapp.cloudfunctions.net/completeRide',
          obj)
        .subscribe((res: any) => {
          console.log(res);
          if (res.status === 'done') {
            this.userData = null;
            this.driverService.rideInProgress = false;
            this.modalController.dismiss();
            this.router.navigate(['home']);
          }
          loader.dismiss();
        });
    });
  }
  
  goBack() {
    this.modalController.dismiss();
  }
}
