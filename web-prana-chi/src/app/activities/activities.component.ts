import { Component } from '@angular/core';
import { ActivitiesModalComponent } from '../activities-modal/activities-modal.component';
import { NavbarSecondaryComponent } from '../navbar-secondary/navbar-secondary.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [ActivitiesModalComponent, NavbarSecondaryComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {

}
