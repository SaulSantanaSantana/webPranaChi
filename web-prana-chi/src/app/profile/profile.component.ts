import { Component } from '@angular/core';
import { NavbarSecondaryComponent } from '../navbar-secondary/navbar-secondary.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarSecondaryComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
