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

login() {
  const params = { identification: this.username, password: this.password };
  this.error = '';
  this.authService.login(params).subscribe({
    next: (response) => {
      if (response) {
        localStorage.setItem('auth-token', "token_true"); // Guardamos el token en el localStorage
        this.router.navigate(['/home']);
      } else {
        this.error = 'Usuario o contraseña incorrectos';
      }
    },
    error: (err) => {
      // Aquí capturamos el mensaje que envía el backend
      this.error = err.error?.message || 'Usuario o contraseña incorrectos';
    }
  });
}

}
