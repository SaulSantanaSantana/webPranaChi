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

  constructor( private userService: UserService, private payService: PaymentService){
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
}
