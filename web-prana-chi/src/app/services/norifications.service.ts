import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserNotificacion } from '../Notificacion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NorificationsService {

  private dbPath = 'Notificaciones';

  constructor(private db: AngularFirestore) { }

  async createNotification(uid: string, mensaje:string, nombre:string): Promise<any> {

    const id = this.db.createId();
    const docRef = this.db.collection(this.dbPath).doc(id);

    let notification = new UserNotificacion;
    notification.Usuario = uid;
    notification.uid = uid;
    notification.Usuario = nombre;
    notification.Mensaje = mensaje;
    notification.id = id;
    
    const data = { ...notification }; 

    await docRef.set( data, { merge: true }).then(() => {
      alert("Notificaiocn creada con éxito")
    });
  }

  getAllNotifications(): Observable<any[]> {
    return this.db.collection(this.dbPath).valueChanges();
  }

  deleteNotifications(id: string, ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Borra el documento de Firestore
      this.db.collection(this.dbPath).doc(id).delete()
        .then(async () => {
          alert("Notifiacion eliminada")
        })
        .catch(error => {
          alert(error);
        });
    });
  }

  updateNotification(id: string, data: UserNotificacion): Promise<void> {
    const docData = { ...data }; 
    return this.db.collection(this.dbPath).doc(id).update(docData);
  }
}
