import { UpdateMyRoomAdPage } from './../update-my-room-ad/update-my-room-ad';
import { RoomAd } from './../../providers/roomAd';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';


@IonicPage()
@Component({
  selector: 'page-preview-modal',
  templateUrl: 'preview-modal.html',
})

export class PreviewModalPage {
  room: any;
  navFrom: boolean;
  imageViewer: ImageViewerController;

 
  constructor(public navCtrl: NavController, public navParams: NavParams, private roomAd: RoomAd, private viewCtrl: ViewController, 
              private launchNavigator: LaunchNavigator, public imageViewerCtrl: ImageViewerController) {
    this.room = this.navParams.get('room');
    this.navFrom = this.navParams.get('navFrom');
    this.imageViewer = imageViewerCtrl;
  }
 
  close() {
    this.viewCtrl.dismiss();
  }

  findOnMap(){
    if(this.room.Eircode != null){
      this.launchNavigator.navigate(this.room.Eircode)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
    }
    else{
      alert("No Eircode Supplied!");
    }
  }

  deleteRoom(){
    this.roomAd.deleteRoom(this.room._id);
    this.viewCtrl.dismiss();
  }

  presentImage(myImage) {
    
    try {
      const Viewer = this.imageViewer.create(myImage);
      Viewer.present();
   
    } catch (error) {
      console.log("Image Error: " + error);
    }
  }

  updateRoom(){
    this.navCtrl.push(UpdateMyRoomAdPage);
  }
}