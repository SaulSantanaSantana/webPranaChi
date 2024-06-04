import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  constructor(public angularFireAuth: AngularFireAuth) {}
}
