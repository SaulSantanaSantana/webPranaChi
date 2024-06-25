import { Component, OnInit } from '@angular/core';
import { NavbarSecondaryComponent } from '../navbar-secondary/navbar-secondary.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Usuario } from '../Usuario.model';
import { UserService } from '../firestore.service';
import { FormsModule } from '@angular/forms';
import { AddProfileComponent } from '../add-profile/add-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarSecondaryComponent, FormsModule, AddProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  uid = "";

  userActual: Usuario = {
    id: "",
    admin: false,
    Telefono: "",
    Nombre: "",
    Correo: "",
    Datos: "",
    perfiles: []
  };

  constructor(private auth: AngularFireAuth, private afs: UserService){}
  
  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.afs.getUser(this.uid).subscribe(document => {
          if (document) {
            this.userActual = document;
          } else {
            alert("Error al acceder a la informacion de usuario")
          }
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

  removeProfile(index: number){
    if (index > -1) {
      this.userActual.perfiles?.splice(index, 1);
    }
  }
}
