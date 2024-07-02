import { Component } from '@angular/core';
import { Usuario } from '../../Usuario.model';
import { UserService } from '../../services/firestore.service';
import { ActivitiesService } from '../../services/activities.service';
import { FormsModule } from '@angular/forms';
import { NorificationsService } from '../../services/norifications.service';

@Component({
  selector: 'app-add-notification',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-notification.component.html',
  styleUrl: './add-notification.component.css'
})
export class AddNotificationComponent {

  mensaje: string = ""

  usuarios: Usuario[] | undefined;
  usuariolSelecionado: string = ""
  usuariolSelecionadoObj: Usuario | undefined;

  constructor( private userService: UserService, private notificationService: NorificationsService){
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

  async createNotification(){
    if(this.usuariolSelecionadoObj?.id && this.usuariolSelecionadoObj?.Nombre){
      await this.notificationService.createNotification(this.usuariolSelecionadoObj?.id, this.mensaje, this.usuariolSelecionadoObj?.Nombre)
      this.usuariolSelecionado = ""
      this.mensaje = ""
    }else if(this.usuariolSelecionado == "General"){
      await this.notificationService.createNotification("", this.mensaje, "General")
      this.usuariolSelecionado = ""
      this.mensaje = ""
    }else{
      alert("Seleccione usuario al que notificar")
    }
    
    
  }

}
