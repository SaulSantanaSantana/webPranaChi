import { Component } from '@angular/core';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { NavbarSecondaryComponent } from '../../navbar-secondary/navbar-secondary.component';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserService } from '../../services/firestore.service';
import { NorificationsService } from '../../services/norifications.service';
import { UserNotificacion } from '../../Notificacion.model';
import { Timestamp } from 'firebase/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NotificationModalComponent, NavbarSecondaryComponent, AddNotificationComponent, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  notifications: UserNotificacion[] = [];
  notificationsFiltered: UserNotificacion[] = []
  namefilter = ""
  marcFilter = "Todas"
  admin = false
  uid = ""

  constructor( private userService: UserService, private notificationService: NorificationsService){
  }

  ngOnInit(){

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userService.getUser(user.uid).subscribe(document => {
          if (document) {
            this.admin = document.admin;
            this.uid = document.uid
          } else {
          }
        });

        this.notificationService.getAllNotifications().subscribe(data => {
          this.notifications = data
          this.notificationsFiltered = data
        });

        if(this.admin == false){
          this.notifications.filter(notification => notification.id?.toString() == this.uid)
          this.notifications.filter(notification => notification.id?.toString() == "General")
        }

      } else {
        // User is signed out
        // ...
      }
    });
  }

  convertirTimestamp(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    return date.toLocaleString();
  }

  deleteNotification(id: any){
    this.notificationService.deleteNotifications(id)
  }

  filter(){
    this.notificationsFiltered = this.notifications
    this.notificationsFiltered = this.notificationsFiltered.filter((notification) => notification.Usuario?.includes(this.namefilter))

    if(this.marcFilter == "true"){
      this.notificationsFiltered = this.notificationsFiltered.filter((notification) => notification.Marcada === true)
    }else if(this.marcFilter == "false"){
      this.notificationsFiltered = this.notificationsFiltered.filter((notification) => notification.Marcada === false)
    }
  }

}
