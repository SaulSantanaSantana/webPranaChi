import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements AfterViewInit {

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

    this.map = L.map('map',{
      center: [28.104435, -15.431867],
      zoom: 15,
      zoomControl: true
    })

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom: 20,
      minZoom: 10,
    })

    tiles.addTo(this.map)

    var customIcon = L.icon({
      iconUrl: "../assets/marker.webp",
  
      iconSize:     [60, 60],
      iconAnchor:   [22, 94]
  });

  L.marker([28.104435, -15.431867], {icon: customIcon}).addTo(this.map);

    this.map.on('moveend', async () => {
      const center = this.map?.getCenter();
      if (center == undefined) {
        return;
      }
    });
  }

}