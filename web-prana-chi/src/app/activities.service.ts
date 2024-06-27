import { Injectable } from '@angular/core';
import { Actividad } from './Actividad.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private dbPath = 'Actividades';

  constructor(private db: AngularFirestore) { }

  async createActividad(nombre: string, lugar: string, horarios: string, monitor: string): Promise<any> {

    const id = this.db.createId();
    const docRef = this.db.collection(this.dbPath).doc(id);

    let actividad = new Actividad;
    actividad.Nombre = nombre;
    actividad.Horario = horarios;
    actividad.Lugar = lugar;
    actividad.Monitor = monitor;
    actividad.id = id;
    
    const actividadData = { ...actividad }; 

    await docRef.set( actividadData, { merge: true }).then(() => {
      alert("Actividad creada con éxito")
    });
  }

  getAllActivities(): Observable<any[]> {
    return this.db.collection(this.dbPath).valueChanges();
  }

  deleteActivity(id: string, ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Borra el documento de Firestore
      this.db.collection(this.dbPath).doc(id).delete()
        .then(async () => {
          alert("Actividad eliminada")
        })
        .catch(error => {
          alert(error);
        });
    });
  }

  updateActivity(id: string, data: Actividad): Promise<void> {
    const docData = { ...data }; 
    return this.db.collection(this.dbPath).doc(id).update(docData);
  }

}
