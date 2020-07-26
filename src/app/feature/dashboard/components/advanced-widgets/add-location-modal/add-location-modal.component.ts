import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

declare let google: any;

@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html',
  styleUrls: ['./add-location-modal.component.scss']
})
export class AddLocationModalComponent implements OnInit {
  zoom = 10;
  latitude = 27.666921;
  longitude = 85.350011;
  markerLatitude = null;
  markerLongitude = null;
  infoWindowOpen: any;
  addressLabel: any;
  locationCoordinates: any;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  findLocation(coordinate) {
    const latLang = coordinate.split(',', 2);
    this.placeMaker(+latLang[0], +latLang[1]);
  }

  placeMaker(latitude, longitude) {
    this.infoWindowOpen = false;
    this.zoom = 10;
    this.latitude = latitude;
    this.longitude = longitude;
    this.markerLatitude = this.latitude;
    this.markerLongitude = this.longitude;
    this.locationCoordinates = this.latitude + ',' + this.longitude;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: number, longitude: number) {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(latitude, longitude);
      const request = {latLng: latlng};
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          const rsltAdrComponent = result.formatted_address;
          if (rsltAdrComponent != null) {
            this.addressLabel = rsltAdrComponent;

            this.infoWindowOpen = true;
          } else {
            this.addressLabel = null;
            this.snackBar.open('No address available!', 'Close', {duration: 2000});
          }
        } else {
          this.addressLabel = null;
          this.snackBar.open('Error in GeoCoder', 'Close', {duration: 2000});
        }
      });
    }
  }

}
