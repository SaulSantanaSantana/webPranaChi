import { Component } from '@angular/core';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { NavbarSecondaryComponent } from '../navbar-secondary/navbar-secondary.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NotificationModalComponent, NavbarSecondaryComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

}
