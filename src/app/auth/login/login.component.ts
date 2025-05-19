import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-login',
  standalone:true, //
  imports: [CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService:AuthService, private router:Router){}
  username='';
  password='';
  error='';
  hidePassword=true;

  login(){
    console.log(this.username);
    console.log(this.password);

    const success= this.authService.login(this.username,this.password)
    if (success){
      this.router.navigate(['/home'])
      console.log('I want to go HOMEEEEE')
    }else{
      this.error='Usuario o contraseña incorrectos'
    }
  }
  forgotPassword(){
    console.log('Presione OLVIDAR PASSWORD')
  }
}
