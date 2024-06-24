import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  text: string[] = ["¿No tienes cuenta?", "¿Tienes Cuenta?"];
  textShowing: string = "¿No tienes cuenta?";
  index: number = 0;

  email: string = "";
  pass: string = "";

  regMail: string = "";
  regPass: string = "";
  regPass2: string = "";
  regName: string = "";

  constructor(public authService: AuthService, private router: Router) {}

  async logIn(){
    if(this.email == ""){
      alert("Complete todos los campos")
    }else if(this.pass == ""){
      alert("Complete todos los campos")
    }else{
      try{
        await this.authService.login(this.email, this.pass)
        this.router.navigate(['/perfil']);
      }catch{
        alert("Credenciales incorrectos")
      }
    }
  }

  async register() {

    if(this.regName === ""){
      alert("Complete todos los campos")
    }else if(this.regMail === ""){
      alert("Complete todos los campos")
    }else if(this.regPass.length < 6){
      alert("Complete todos los campos")
    }else if(this.regPass != this.regPass2){
      alert("Las contraseñas no coinciden")
    }else{
      try{
        await this.authService.signUp(this.regMail ,this.regPass, this.regName)
        this.router.navigate(['/perfil']);
      }catch{
        alert("Ha ocurrido un error en el registro")
      }
    }

  }

  navigatetoProfile(){
    this.router.navigate(['/perfil']);
  }

  changeText(){
    if(this.index == 0){
      this.index = 1
      this.textShowing = this.text[1]
    }else{
      this.index = 0
      this.textShowing = this.text[0]
    }
  }

}
