import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY= 'auth-token';

  constructor(private router:Router) { }

  login(username:string, password:string): boolean{
    if (username==='admin'&& password==='123'){
      localStorage.setItem(this.TOKEN_KEY,'fake_token')
      return true
    }
    return false
  }

  isLoggedIn():boolean{
    return localStorage.getItem(this.TOKEN_KEY) !=null;
    
  }
}
