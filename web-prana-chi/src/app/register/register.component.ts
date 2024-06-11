import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  nombre: string = "";
  email: string = "";
  pass: string = "";
  checkPass: string = ""; 

  constructor(private authService: AuthService) { }
  
  register() {

    if(this.nombre == ""){

    }else if(this.email == ""){

    }else if(this.pass == ""){

    }else if(this.checkPass != this.pass){

    }else{
      try{
        this.authService.signUp(this.email,this.pass)
      }catch{

      }
    }

  }
  
}
