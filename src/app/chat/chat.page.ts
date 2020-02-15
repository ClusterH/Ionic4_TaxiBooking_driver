/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {
  customer: any;
  driver: any;
  User: string = 'Me';
  toUser: string = 'driver';
  inp_text: any;
  flag: boolean = false;

  msgList: Array<{
    fromId: any,
    toId: any,
    message: any,
    upertext: any;
  }>
  constructor(    
    public route: ActivatedRoute,
    private auth: AuthService,
    private http: HttpClient,
  ) {
    // this.msgList = [
    //   {
    //     userId: this.User,
    //     userName: this.User,
    //     userAvatar: 'assets/placeholder.png',
    //     time: '12:01 pm',
    //     message: 'Hello, are you nearby?',
    //     upertext: 'Hello, are you nearby?'
    //   },
    //   {
    //     userId: this.toUser,
    //     userName: this.toUser,
    //     userAvatar: 'assets/user.jpeg',
    //     time: '12:01 pm',
    //     message: 'i\'ll be there in few a mins',
    //     upertext: 'i\'ll be there in few a mins'
    //   },
    //   {
    //     userId: this.User,
    //     userName: this.User,
    //     userAvatar: 'assets/placeholder.png',
    //     time: '12:01 pm',
    //     message: 'Ok i am waiting..',
    //     upertext: 'Ok i am waiting..'
    //   },
    //   {
    //     userId: this.toUser,
    //     userName: this.toUser,
    //     userAvatar: 'assets/user.jpeg',
    //     time: '12:01 pm',
    //     message: 'Sorry i am stack in traffic Please give me a moment',
    //     upertext: 'Sorry i am stack in traffic Please give me a moment'
    //   }
    // ];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.customer = params;
    });

    this.auth.user.subscribe(res => {
      console.log(res);
      this.driver = res;
      this.flag = false;
    })
  }

  sendMsg(chipText?) {
    this.inp_text = this.inp_text ? this.inp_text : chipText;
    console.log(this.driver.email, this.customer.email);
    let obj = {
      fromId: this.driver.email,
      toId: this.customer.email,
      message: this.inp_text,
      upertext: this.inp_text,
      flag: this.flag,
    };

    this.http
      .post(
        'https://us-central1-iondriverhapp.cloudfunctions.net/chatContents',
        obj)
      .subscribe((res: any) => {
        console.log(res);
        if (res) {
          console.log(res);
          this.flag = true;
          // this.msgList.push({
          //   fromId: this.driver.email,
          //   toId: this.customer.email,
          //   message: this.inp_text,
          //   upertext: this.inp_text
          // });
        }
      });
    
    this.inp_text = '';
    setTimeout(() => {
      // this.content.scrollToBottom();
    });
    this.inp_text = '';
  }

}
