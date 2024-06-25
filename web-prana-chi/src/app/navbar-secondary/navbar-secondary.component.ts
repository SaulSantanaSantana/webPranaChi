import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
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
