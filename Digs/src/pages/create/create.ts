import { CreatePropertyAdPage } from './../create-property-ad/create-property-ad';
import { CreateRoomAdPage } from './../create-room-ad/create-room-ad';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  navToCreateRoom(){
    this.navCtrl.setRoot(CreateRoomAdPage);
  }

  navToCreateProperty(){
    this.navCtrl.setRoot(CreatePropertyAdPage);
  }

}
