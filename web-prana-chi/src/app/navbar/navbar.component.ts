import { Component } from '@angular/core';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LogInComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
