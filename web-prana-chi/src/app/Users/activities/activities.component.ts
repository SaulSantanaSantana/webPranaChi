import { Component } from '@angular/core';
import { ActivitiesModalComponent } from '../activities-modal/activities-modal.component';
import { NavbarSecondaryComponent } from '../../navbar-secondary/navbar-secondary.component';
import { CreateActivityComponent } from '../create-activity/create-activity.component';
import { ActivitiesService } from '../../services/activities.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserService } from '../../services/firestore.service';
import { Actividad } from '../../models/Actividad.model';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [ActivitiesModalComponent, NavbarSecondaryComponent, CreateActivityComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {

  admin = false
  uid = ""
  name = ""
  actividades: Actividad[] = []

  constructor(private activitiesService: ActivitiesService, private auth: AngularFireAuth, private afs: UserService){}

  ngOnInit() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.afs.getUser(user.uid).subscribe(document => {
          if (document) {
            this.admin = document.admin;
            this.uid = document.uid
            this.name = document.Nombre
          } else {
          }
        });

        this.activitiesService.getAllActivities().subscribe(data => {
          this.actividades = data;
        });

        if(this.admin == false){
          this.actividades.filter(actividad => actividad.Usuarios?.includes(this.uid))
        }

      } else {
        // User is signed out
        // ...
      }
    });
    
  }

  deleteActivity(actividad: Actividad){
    if(actividad.id){
      this.activitiesService.deleteActivity(actividad.id)
    } 
  }

  generateTimeTable(){
    this.activitiesService.generarHorario(this.actividades, this.name)
  }
}
