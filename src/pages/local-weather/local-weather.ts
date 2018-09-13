import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import * as moment from 'moment';


import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import {TripService} from "../../services/trip-service";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
  
@Component({
  selector: 'page-local-weather',
  templateUrl: 'local-weather.html'
})
export class LocalWeatherPage {
  private items:any;
  itemso: Observable<any>;
  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController, public tripService: TripService, public httpClient: HttpClient) {
    this.itemso = this.httpClient.get('http://localhost:3000/buy_items');
    this.itemso
    .subscribe(data => {
      this.items = data;
    })
  }

  ionViewWillEnter() {
  }

  expiredTime(dateValue){
  console.log(dateValue);
    var dateNow = moment();
    var dateExpired = moment(dateValue);
    var leftDate = dateExpired.diff(dateNow, 'days'); 
    console.log(leftDate);
    if(leftDate < 7 ){
      if(leftDate < 3){
        if(leftDate < 1){
          return "expired";
        }else{
          return leftDate + "days Left";
        }
      }else{
        return "1 Week Left";
      }
    }else{
      return "More Than 1 Month";
    }
  }


}
