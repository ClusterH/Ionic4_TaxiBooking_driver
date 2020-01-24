/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */



import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})



export class ChatPage implements OnInit {
  User: string = 'Me';
  toUser: string = 'driver';
  inp_text: any;

  msgList: Array<{
    userId: any,
    userName: any,
    userAvatar: any,
    time: any,
    message: any,
    upertext: any;
  }>
  constructor() {
    this.msgList = [
      {
        userId: this.User,
        userName: this.User,
        userAvatar: 'assets/placeholder.png',
        time: '12:01 pm',
        message: 'Hello, are you nearby?',
        upertext: 'Hello, are you nearby?'
      },
      {
        userId: this.toUser,
        userName: this.toUser,
        userAvatar: 'assets/user.jpeg',
        time: '12:01 pm',
        message: 'i\'ll be there in few a mins',
        upertext: 'i\'ll be there in few a mins'
      },
      {
        userId: this.User,
        userName: this.User,
        userAvatar: 'assets/placeholder.png',
        time: '12:01 pm',
        message: 'Ok i am waiting..',
        upertext: 'Ok i am waiting..'
      },
      {
        userId: this.toUser,
        userName: this.toUser,
        userAvatar: 'assets/user.jpeg',
        time: '12:01 pm',
        message: 'Sorry i am stack in traffic Please give me a moment',
        upertext: 'Sorry i am stack in traffic Please give me a moment'
      }
    ];
  }

  ngOnInit() {
  }

  sendMsg(chipText?) {
    this.inp_text = this.inp_text ? this.inp_text : chipText;
    this.msgList.push({
      userId: this.User,
      userName: this.User,
      userAvatar: 'assets/placeholder.png',
      time: '12:01 pm',
      message: this.inp_text,
      upertext: this.inp_text
    });
    this.msgList.push({
      userId: this.toUser,
      userName: this.toUser,
      userAvatar: 'assets/user.jpeg',
      time: '12:01 pm',
      message: this.inp_text,
      upertext: this.inp_text
    })
    this.inp_text = '';
    setTimeout(() => {
      // this.content.scrollToBottom();
    });
    this.inp_text = '';
  }

}
