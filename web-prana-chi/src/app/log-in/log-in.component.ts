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

    }else if(this.pass == ""){

    }else{
      try{
        this.authService.login(this.email, this.pass)
      }catch{

      }
    }
  }

  register() {

    if(this.regName == ""){

    }else if(this.regMail == ""){

    }else if(this.regPass == ""){

    }else if(this.regPass != this.regPass2){

    }else{
      try{
        this.authService.signUp(this.email,this.pass)
      }catch{

      }
    }

  }
}
