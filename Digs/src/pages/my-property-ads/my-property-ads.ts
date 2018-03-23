import { Storage } from '@ionic/storage';
import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-my-property-ads',
  templateUrl: 'my-property-ads.html',
})
export class MyPropertyAdsPage {
  properties: any;
  navFrom: boolean = true;
  email: any;

  constructor(public navCtrl: NavController,public propertyAdService: PropertyAd, public navParams: NavParams, 
              public modalCtrl: ModalController, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('email').then((val) => {
      
      this.email = val;

      this.propertyAdService.getMyProperties(this.email).subscribe((data) => {
        console.log("Data returned from MyRooms on Load: " + JSON.stringify(data));
        this.properties = data; 
      },
      error => { 
        alert("ERROR Retrieving My Room Ads: " + error);
      });
    });
  }

  openProperty(property, navFrom) {
    let modal = this.modalCtrl.create('PreviewPropertyModalPage', { property: property , navFrom: this.navFrom});
    modal.present();  
  }
}
