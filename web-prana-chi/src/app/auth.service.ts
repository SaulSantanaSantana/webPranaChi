
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: Auth) { }

  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.afAuth, email, password)
      .then(() => {
        console.log("Oleeee")
      })
      .catch((error) => {
        console.log(error)
      });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.afAuth,email, password)
      .then(() => {
        console.log("Oleeee")
      })
      .catch((error) => {
        console.log(error)
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