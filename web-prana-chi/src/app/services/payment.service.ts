import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Pay } from '../models/pay.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly _url = environment.payUrl

  private dbPath = 'Pagos';

  constructor(private db: AngularFirestore, private http: HttpClient) { }

  async createPayment(uid: string, concepto:string, nombre:string, cantidad:number, alerts:boolean): Promise<any> {

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
      if(alerts){
        alert("Pago creado con éxito")
      }
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

  checkoutPay(payments: Pay[]){
    return this.http.post(this._url, {items: payments}).pipe(
      map( async (res:any) =>{
        const stripe = await loadStripe(environment.stripeKey)
        stripe?.redirectToCheckout({sessionId: res.id});
      })
    ).subscribe({
      error: (err) => alert("Error con la pasarel de pago")
    })
  }
}
