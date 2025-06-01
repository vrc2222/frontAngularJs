import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule,Router } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts";


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',

})
export class MainLayoutComponent {
  constructor(private router: Router) {}
  logout(): void {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
}

@NgModule({
  declarations: [],
  imports: [
      NgApexchartsModule
  ],

})
export class AppModule { }
