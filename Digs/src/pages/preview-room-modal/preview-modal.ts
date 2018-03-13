import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-preview-modal',
  templateUrl: 'preview-modal.html',
})

export class PreviewModalPage {
  room: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.room = this.navParams.get('room');
  }
 
  close() {
    this.viewCtrl.dismiss();
  }

 
}