import { UpdateMyRoomAdPage } from './../update-my-room-ad/update-my-room-ad';
import { Storage } from '@ionic/storage';
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
  email: any;
  navFrom: boolean = true;

  constructor(public navCtrl: NavController,public roomAdService: RoomAd, public navParams: NavParams, 
              public modalCtrl: ModalController, private storage: Storage, private roomAd: RoomAd) {

  }

  ionViewDidEnter(){
    this.storage.get('email').then((val) => {
      
      this.email = val;

      this.roomAdService.getMyRooms(this.email).subscribe((data) => {
        //console.log("Data returned from MyRooms on Load: " + JSON.stringify(data));
        this.rooms = data; 
      },
      error => {
        alert("ERROR Retrieving My Room Ads: " + error);
      });
    });  
  }

  openRoom(room, navFrom) {
    let modal = this.modalCtrl.create('PreviewModalPage', { room: room, navFrom: this.navFrom });
    modal.present();

    modal.onDidDismiss(data => {
      this.roomAdService.getMyRooms(this.email).subscribe((data) => {
        console.log("Data returned from MyRooms on Load: " + JSON.stringify(data));
        this.rooms = data; 
      },
      error => {
        alert("ERROR Retrieving My Room Ads: " + error);
      });
    });
  }

  updateAd(room){
    this.navCtrl.push(UpdateMyRoomAdPage, {room: room});
  }

  deleteAd(room){
    console.log("Deleting...");
    try{
      this.roomAd.deleteRoom(room._id);
    }
    catch(e){
      console.log("Error deleting...: " + e);
    }
    let deleteTimeout = setTimeout( () => { this.navCtrl.setRoot(MyRoomAdsPage); }, 500);
   
  }
}
