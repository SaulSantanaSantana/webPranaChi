import { Component, OnInit } from '@angular/core';
import { NavbarSecondaryComponent } from '../../navbar-secondary/navbar-secondary.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Usuario } from '../../Usuario.model';
import { UserService } from '../../services/firestore.service';
import { FormsModule } from '@angular/forms';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { ActivitiesService } from '../../services/activities.service';
import { Actividad } from '../../Actividad.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarSecondaryComponent, FormsModule, AddProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  uid = "";
  actividades: Actividad[] = []

  userActual: Usuario = {
    id: "",
    admin: false,
    Telefono: "",
    Nombre: "",
    Correo: "",
    Datos: "",
    perfiles: []
  };

  constructor(private auth: AngularFireAuth, private afs: UserService, private activitiesService: ActivitiesService){}
  
  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.afs.getUser(this.uid).subscribe(document => {
          if (document) {
            this.userActual = document;
          } else {
          }
        });

        this.activitiesService.getAllActivities().subscribe(data => {
          this.actividades = data;
          this.actividades = this.actividades.filter(actividad => actividad.Usuarios?.includes(this.uid))
        });

      } else {
        // User is signed out
        // ...
      }
    });
  }

  receiveMessage(name: string) {
    this.userActual.perfiles?.push(name)
  }

  updateData(){
    this.afs.updateUser(this.uid, this.userActual).then(() => {
      alert("Guardado con exito")
    })
    .catch((error) => {
      alert(error)
    });
  }

  getActivities(perfil: string){

    let actividades = ""
    this.actividades.filter(actividad => actividad.Perfiles?.includes(this.userActual.Nombre + ": "+perfil))
    .forEach(actividad =>{
      actividades = actividades + actividad.Nombre + " "
    })

    if(actividades == ""){
      actividades = "-"
    }

    return actividades
  }

  removeProfile(index: number){
    if (index > -1) {
      this.userActual.perfiles?.splice(index, 1);
    }
  }
}
