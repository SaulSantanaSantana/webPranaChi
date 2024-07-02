import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './General/landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { ActividadesComponent } from './General/actividades/actividades.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { PaymentService } from './services/payment.service';

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
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [PaymentService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web-prana-chi';
}
