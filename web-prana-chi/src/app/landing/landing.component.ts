import { Component} from '@angular/core';
import { MapComponent } from '../map/map.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MapComponent,RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})


export class LandingComponent {

}
