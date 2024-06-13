import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RegisterComponent, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  email: string = "";
  pass: string = "";

  regMail: string = "";
  regPass: string = "";
  regPass2: string = "";
  regName: string = "";

  constructor(public authService: AuthService) {}

  logIn(){
    if(this.email == ""){
      alert("Complete todos los campos")
    }else if(this.pass == ""){
      alert("Complete todos los campos")
    }else{
      try{
        this.authService.login(this.email, this.pass)
      }catch{
        alert("Credenciales incorrectos")
      }
    }
  }

  register() {

    if(this.regName == ""){
      alert("Complete todos los campos")
    }else if(this.regMail == ""){
      alert("Complete todos los campos")
    }else if(this.regPass == ""){
      alert("Complete todos los campos")
    }else if(this.regPass != this.regPass2){
      alert("Las contraseñas no coinciden")
    }else{
      try{
        this.authService.signUp(this.email,this.pass)
      }catch{
        alert("Ha ocurrido un error en el registro")
      }
    }

  }
}
