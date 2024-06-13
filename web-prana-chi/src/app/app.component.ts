import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,
    RouterOutlet, 
    NavbarComponent, 
    LandingComponent, 
    FooterComponent, 
    ActividadesComponent,
    RouterLink, 
    RouterLinkActive,
    CommonModule,
    RouterModule,
    FormsModule,
    AngularFirestoreModule
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web-prana-chi';
}
