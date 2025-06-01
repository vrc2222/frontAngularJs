import { Routes } from '@angular/router';
import { LoginComponent} from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout.component';

export const routes: Routes = [{
    path: '',
    component: MainLayoutComponent ,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
    },
    {path: 'login', component: LoginComponent},
];
