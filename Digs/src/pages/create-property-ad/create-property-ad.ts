import { Storage } from '@ionic/storage';
import { ListOfPropertiesPage } from './../list-of-properties/list-of-properties';
import { Camera } from '@ionic-native/camera';
import { ImagesProvider } from './../../providers/images/images';
import { Md5 } from 'ts-md5/dist/md5';
import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ActionSheetController, ModalController  } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: 'page-create-property-ad',
  templateUrl: 'create-property-ad.html',
})
export class CreatePropertyAdPage {
  imageButton: String = "Upload Image";
  time: any = new String(new Date());
  email: String;
  UID: String; 
  AdID: any = Md5.hashStr(this.time);
  PropertyType: String;
  SingleBeds: any = 0;
  DoubleBeds: any = 0;
  TwinBeds: any = 0;
  EnSuite: any = 0;
  College: String[];
  Address: String;
  Eircode: String;
  LocationDes: String;
  Price: any;
  Availability: any;
  Email: String;
  Phone: any;
  Contact: String;
  Description: String;
  Parking: String;
  ImageURL: String[];
  Date: Date;

  constructor(public navCtrl: NavController,public propertyAdService: PropertyAd, public navParams: NavParams, private modalCtrl: ModalController,
    public viewCtrl: ViewController, private actionSheetCtrl: ActionSheetController,private imagesProvider: ImagesProvider, 
    private camera: Camera, private storage: Storage, private inAppBrowser: InAppBrowser) {
  }

  ionViewDidLoad() {
    this.storage.get('email').then((val) => {
      this.email = val;
    });
    
  }

  publishAd() {

    this.imagesProvider.getImageAdID(this.AdID).map(res => res.json()).subscribe(data => {

    let property = {
      UID: this.email,
      AdID: this.AdID,
      PropertyType: this.PropertyType,
      SingleBeds: this.SingleBeds,
      DoubleBeds: this.DoubleBeds,
      TwinBeds: this.TwinBeds,
      EnSuite: this.EnSuite,
      College: this.College,
      Address: this.Address,
      Eircode: this.Eircode,
      LocationDes: this.LocationDes,
      Price: this.Price,
      Availability: this.Availability,
      Email: this.Email,
      Phone: new String(this.Phone),
      Contact: this.Contact,
      Description: this.Description,
      Parking: this.Parking,
      ImageURL: data,
      Date: new Date()
    };
    this.propertyAdService.createProperty(property);  
    this.navCtrl.setRoot(ListOfPropertiesPage);
  });
  }

  uploadOption() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          icon: 'folder',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
    this.imageButton = "Add Another Image";
  }

  takePicture(sourceType){
    // Create options for the Camera Dialog
    var options = {
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      let modal = this.modalCtrl.create('UploadModalPage', { data: imagePath, adID: this.AdID });
      modal.present();
      
      modal.onDidDismiss(data => {
        console.log("TP + Data Returned: " + JSON.stringify(data));
      });

    }, (err) => {
      console.log('Error: ', err);
    });

  }

  moreInfo(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create("https://finder.eircode.ie/#/", '_self', options);
  }

}
