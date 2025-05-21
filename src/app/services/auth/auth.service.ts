import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth-token';
  private path = 'http://localhost:5000/user';
  private readonly _http = inject(HttpClient);

  constructor(private router: Router) {}

  login(params: any) {
    return this._http.post<any>(`${this.path}/validateUser`, params);
  }

  // Poner funciones service

  create(params: any) {
    return this._http.post<any>(`${this.path}/create`, params);
  }

  getUsers() {
    return this._http.get<any>(`${this.path}/users`);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) != null;
  }
  delete(params: any) {
    return this._http.put<any>('http://localhost:5000/user/deleteUser', params);
  }
}
