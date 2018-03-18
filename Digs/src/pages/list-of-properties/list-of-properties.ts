import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list-of-properties',
  templateUrl: 'list-of-properties.html',
})
export class ListOfPropertiesPage {

  properties: any;

  constructor(public navCtrl: NavController,public propertyAdService: PropertyAd, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidEnter() {
    this.propertyAdService.getProperties().subscribe((data) => {
      console.log(data);
      this.properties = data;
    },
    error => {
      alert("ERROR Retrieving Property Ads: " + error);
    });
  }

  openProperty(property) {
    let modal = this.modalCtrl.create('PreviewPropertyModalPage', { property: property });
    modal.present();
  }

  doRefresh(refresher) {

    this.propertyAdService.getProperties().subscribe(data => {
      this.properties = data;
    },
    error => {
      alert("ERROR Retrieving Property Ads: " + error);
    });
    refresher.complete();
  }

}
