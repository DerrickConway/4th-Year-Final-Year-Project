import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class PropertyAd {
 
  data: any;
  //apiURL = 'http://localhost:8080/';
  apiURL = 'http://54.73.1.214:8080/'; //patrick
  //apiURL = 'http://52.56.193.204:8080/'; // andrei
  //apiURL = 'http://54.72.69.79:8080/'; //gerard
 
  constructor(public http: Http) {
    this.data = null;
  }
 
  getProperties(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get(this.apiURL+'api/properties')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
 
  createProperty(property){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post(this.apiURL+'properties', JSON.stringify(property), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }
 
  deleteProperty(id){
 
    this.http.delete(this.apiURL+'properties/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }
 
}