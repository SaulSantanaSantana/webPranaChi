
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) { }

  signUp(email: string, password: string) {
    console.log(email)
    console.log(password)
    this.afAuth.createUserWithEmailAndPassword(email,password)
      .then(() => {
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