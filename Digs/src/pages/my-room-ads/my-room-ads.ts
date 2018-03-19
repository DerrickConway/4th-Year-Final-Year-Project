import { RoomAd } from './../../providers/roomAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-my-room-ads',
  templateUrl: 'my-room-ads.html',
})
export class MyRoomAdsPage {

  rooms: any;
  navFrom: boolean = true;

  constructor(public navCtrl: NavController,public roomAdService: RoomAd, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.roomAdService.getMyRooms().subscribe((data) => {
      console.log("Data returned from MyRooms on Load: " + JSON.stringify(data));
      this.rooms = data; 
    },
    error => {
      alert("ERROR Retrieving My Room Ads: " + error);
    });
  }

  openRoom(room, navFrom) {
    let modal = this.modalCtrl.create('PreviewModalPage', { room: room, navFrom: this.navFrom });
    modal.present();
  }
}
