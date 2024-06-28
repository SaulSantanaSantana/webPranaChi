import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserNotificacion } from './Notificacion.model';
import { Observable } from 'rxjs';
import { Pay } from './pay.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private dbPath = 'Pagos';

  constructor(private db: AngularFirestore) { }

  async createPayment(uid: string, concepto:string, nombre:string, cantidad:number): Promise<any> {

    const id = this.db.createId();
    const docRef = this.db.collection(this.dbPath).doc(id);

    let payment = new Pay;
    payment.Usuario = uid;
    payment.Cantidad = cantidad
    payment.uid = uid;
    payment.Usuario = nombre;
    payment.Concepto = concepto;
    payment.id = id;
    
    const data = { ...payment }; 

    await docRef.set( data, { merge: true }).then(() => {
      alert("Pago creado con éxito")
    });
  }

  getAllPays(): Observable<any[]> {
    return this.db.collection(this.dbPath).valueChanges();
  }

  deletePay(id: string, ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Borra el documento de Firestore
      this.db.collection(this.dbPath).doc(id).delete()
        .then(async () => {
          alert("Pago eliminado")
        })
        .catch(error => {
          alert(error);
        });
    });
  }

  updatePay(id: string, data: Pay): Promise<void> {
    const docData = { ...data }; 
    return this.db.collection(this.dbPath).doc(id).update(docData);
  }
}
