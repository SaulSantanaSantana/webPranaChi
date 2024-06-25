import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserService } from './firestore.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private fsService: UserService, private router: Router) { }

  signUp(email: string, password: string, name: string) {
    this.afAuth.createUserWithEmailAndPassword(email,password)
      .then((cred) => {
        const user = cred.user;
        if(user){
          this.fsService.createUser(name, email, user.uid)
          .then(() =>{})
          .catch((e: any) => {
          alert(e)
        });
        }
      })
      .catch((error) => {
        alert(error)
      });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/perfil']);
      })
      .catch((error) => {
        alert(error)
      });
  }

  
  logOut() {
    this.afAuth.signOut()
    .then(() => {
      this.router.navigate(['/'])
    })
    .catch((error) => {
      alert(error)
    });
  }

}