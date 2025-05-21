import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private path = 'http://localhost:5000/dashboard';
  private readonly _http = inject(HttpClient);

  constructor() { }

  dashBoard(identification: string){
    return this._http.get<any>(`${this.path}/getImages/${identification}`)
  }
}
