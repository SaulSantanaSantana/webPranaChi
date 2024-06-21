import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserService } from './firestore.service';
import { Usuario } from './Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private fsService: UserService) { }

  signUp(email: string, password: string, name: string) {
    this.afAuth.createUserWithEmailAndPassword(email,password)
      .then(() => {
        this.fsService.createUser(name, email)
        .then(() =>{})
        .catch((e: any) => {
          alert(e)
        });
      })
      .catch((error) => {
        alert(error)
      });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
      })
      .catch((error) => {
        alert(error)
      });
  }

  /*
  logOut() {
    this.afAuth.signOut();
  }

  get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }*/
}