import { Component, NgModule } from '@angular/core';
import { MapComponent } from '../map/map.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})


export class LandingComponent {

}
