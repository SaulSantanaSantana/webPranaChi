import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-map2',
  standalone: true,
  imports: [],
  templateUrl: './map2.component.html',
  styleUrl: './map2.component.css'
})
export class Map2Component implements AfterViewInit {

  private map: any;

  private initMap(): void {

  }

  ngAfterViewInit(): void { 
    this.initMap();
  }

}
