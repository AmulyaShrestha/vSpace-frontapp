import {Component, Input, OnInit} from '@angular/core';
declare let google: any;

@Component({
  selector: 'app-location-viewer',
  templateUrl: './location-viewer.component.html',
  styleUrls: ['./location-viewer.component.scss']
})
export class LocationViewerComponent implements OnInit {
  @Input() locationCoordinates;
  zoom = 10;
  latitude = 27.666921;
  longitude = 85.350011;
  markerLatitude = null;
  markerLongitude = null;
  infoWindowOpen: any;
  addressLabel: any;

  constructor() { }

  ngOnInit() {
    this.findLocation(this.locationCoordinates);
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
          }
        } else {
          this.addressLabel = null;
        }
      });
    }
  }
}
