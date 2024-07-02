import { Component, Input } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [],
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.css'
})
export class NotificationModalComponent {

  @Input() notification: any;
  buttonEnable = true

  constructor(private notifications: NotificationsService){}

  convertirTimestamp(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    return date.toLocaleString();
  }

  toggleMarc(){
    this.buttonEnable = false
    this.notification.Marcada = !this.notification.Marcada
    this.notifications.updateNotification(this.notification.id, this.notification).then(() =>{
      this.buttonEnable = true
    })
  }

}
