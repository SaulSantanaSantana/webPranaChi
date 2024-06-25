import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../firestore.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-navbar-secondary',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-secondary.component.html',
  styleUrl: './navbar-secondary.component.css'
})
export class NavbarSecondaryComponent {
  
    constructor( private afs: AuthService){}

    logOut(){
      this.afs.logOut()
    }
}
