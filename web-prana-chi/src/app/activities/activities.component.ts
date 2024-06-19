import { Component } from '@angular/core';
import { ActivitiesModalComponent } from '../activities-modal/activities-modal.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [ActivitiesModalComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {

}
