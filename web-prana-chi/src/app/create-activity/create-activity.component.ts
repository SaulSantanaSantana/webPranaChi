import { Component } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-activity',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.css'
})
export class CreateActivityComponent {

  nombre = ""
  lugar = ""
  horarios = ""
  monitor = ""

  constructor( private activitiesService: ActivitiesService ){}

  async createActivity(){
    await this.activitiesService.createActividad(this.nombre, this.lugar, this.horarios, this.monitor)
    this.nombre = ""
    this.lugar = ""
    this.horarios = ""
    this.monitor = ""
  }

}
