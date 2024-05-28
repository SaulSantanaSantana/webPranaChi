import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation'
import * as L from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent  implements AfterViewInit {

  private map:L.Map | undefined;
  private markerLayer: L.LayerGroup| undefined
  provider:OpenStreetMapProvider;

  constructor() { 
    this.provider = new OpenStreetMapProvider();
  }


  async ngAfterViewInit(): Promise<void> {
    await this.initMap()    
  }

  async initMap(){

    let location

    try {
      await Geolocation.requestPermissions();
      location = await Geolocation.getCurrentPosition({enableHighAccuracy:true})
    } catch (error) {
      location = await Geolocation.getCurrentPosition()
    }

    this.map = L.map('map',{
      center:[location.coords.latitude,location.coords.longitude],
      zoom: 18,
      zoomControl: false
    })

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom:20,
      minZoom:3
    })

    tiles.addTo(this.map)

    this.map.on('moveend', async () => {
      const center = this.map?.getCenter();
      if (center == undefined) {
        return;
      }
    });
  }

}