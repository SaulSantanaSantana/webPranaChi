import { Component } from '@angular/core';
import { NavbarSecondaryComponent } from '../navbar-secondary/navbar-secondary.component';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { FormsModule } from '@angular/forms';
import { Pay } from '../pay.model';
import { UserService } from '../firestore.service';
import { PaymentService } from '../payment.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { HttpClientModule } from '@angular/common/http';
import { ActivitiesService } from '../activities.service';
import { Actividad } from '../Actividad.model';
import { Usuario } from '../Usuario.model';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [NavbarSecondaryComponent, AddPaymentComponent, FormsModule, HttpClientModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent {

  pays: Pay[] = [];
  paysFiltered: Pay[] = []
  namefilter = ""
  marcFilter = "Todas"
  admin = false
  uid = ""

  constructor( private userService: UserService, private payService: PaymentService, private activitiesService: ActivitiesService){
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

        this.payService.getAllPays().subscribe(data => {
          this.pays = data
          this.paysFiltered = data
        });

        if(this.admin == false){
          this.pays.filter(pay => pay.id?.toString() == this.uid)
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

  filter(){
    this.paysFiltered = this.pays
    this.paysFiltered = this.paysFiltered.filter((pay) => pay.Usuario?.includes(this.namefilter))

    if(this.marcFilter == "true"){
      this.paysFiltered = this.paysFiltered.filter((pay) => pay.Marcada === true)
    }else if(this.marcFilter == "false"){
      this.paysFiltered = this.paysFiltered.filter((pay) => pay.Marcada === false)
    }
  }

  deletePay(id: any){
    this.payService.deletePay(id)
  }

  async StripePay(pago: Pay){
    pago.Marcada = true
    if(pago.id){
      await this.payService.updatePay(pago.id, pago)

      let pendentPays: Pay[] = []
      pendentPays.push(pago)
      this.payService.checkoutPay(pendentPays)
    } 
  }

  async generateMonthPays(){
    this.activitiesService.getAllActivities().subscribe(data => {
      data.forEach(actividad =>{
        actividad.Usuarios.forEach((usuarioActividadId: string) => {
          this.userService.getUser(usuarioActividadId).subscribe(data => {
            let usuarioActividad = data
            let concepto = "Pago Mensual de " + actividad.Nombre
            if(usuarioActividad.id && usuarioActividad.Nombre){
              this.payService.createPayment(usuarioActividad.id, concepto, usuarioActividad.Nombre, actividad.PrecioMes, false)
            }
          })
        })
      })
    });
    alert("Generacion de pagos mensuales completada")
  }
}
