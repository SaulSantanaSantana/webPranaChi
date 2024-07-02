import { Component, Input } from '@angular/core';
import { Actividad } from '../../models/Actividad.model';
import { UserService } from '../../services/firestore.service';
import { Usuario } from '../../models/Usuario.model';
import { FormsModule } from '@angular/forms';
import { ActivitiesService } from '../../services/activities.service';
@Component({
  selector: 'app-activities-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './activities-modal.component.html',
  styleUrl: './activities-modal.component.css'
})
export class ActivitiesModalComponent {

  @Input() actividad: any;

  usuarios: Usuario[] | undefined;
  perfilSelecionado: string = ""
  usuariolSelecionado: string = ""
  usuariolSelecionadoObj: Usuario | undefined;

  constructor( private userService: UserService, private activitiesService: ActivitiesService){
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

  AddUser(){
    
  if(this.usuariolSelecionadoObj){
    if(this.actividad.Usuarios?.includes(this.usuariolSelecionadoObj.id) == false){
      this.actividad.Usuarios?.push(this.usuariolSelecionadoObj.id)
    }

    this.actividad.Perfiles?.push(this.perfilSelecionado)

    this.activitiesService.updateActivity(this.actividad.id, this.actividad).then(() => {
      alert("Actividad actualizada")
    })
  }else{
    alert("Debe seleccionar un usuario")
  }

  this.usuariolSelecionado = ""
  this.perfilSelecionado = ""
  } 

  spliceProfiles(index: any){
    this.actividad.Perfiles.splice(index, 1);

    this.activitiesService.updateActivity(this.actividad.id, this.actividad).then(() => {
      alert("Actividad actualizada")
    })
  }

}
