import { Component } from '@angular/core';
import { Usuario } from '../../Usuario.model';
import { UserService } from '../../services/firestore.service';
import { PaymentService } from '../../services/payment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css'
})
export class AddPaymentComponent {

  
  Concepto: string = ""
  cantidad: number = 0.0
  usuarios: Usuario[] | undefined;
  usuariolSelecionado: string = ""
  usuariolSelecionadoObj: Usuario | undefined;

  constructor( private userService: UserService, private payService: PaymentService){
  }

  ngOnInit(){
    this.userService.getAllUsers().subscribe(data => {
      this.usuarios = data;
    });
  }

  onChange = () => {
    if(this.usuarios){
      this.usuariolSelecionadoObj = this.usuarios.find((usuario)=>
        usuario.id == this.usuariolSelecionado.split(": ")[1]
      );
    }
  }

  async createPayments(){
    if(this.usuariolSelecionadoObj?.id && this.usuariolSelecionadoObj?.Nombre){
      await this.payService.createPayment(this.usuariolSelecionadoObj?.id, this.Concepto, this.usuariolSelecionadoObj?.Nombre, this.cantidad, true)
      this.usuariolSelecionado = ""
      this.Concepto = ""
      this.cantidad = 0
    }else{
      alert("Seleccione usuario")
    }
    
    
  }

}
