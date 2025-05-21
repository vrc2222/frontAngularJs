import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private http: HttpClient) {}

  private userService = inject(AuthService);

  currentSection: string = 'home';

  mostrarModal = false;

  usuarios: any[] = []; // 🔹 Lista de usuarios con rol USER

  displayedColumns: string[] = [
    'username',
    'email',
    'identification',
    'actions',
  ]; // ✅ columnas para mat-table

  nuevoUsuario = {
    username: '',
    password: '',
    email: '',
    identification: '',
    role: 'USER',
  };

  ngOnInit(): void {
    this.obtenerUsuarios(); // 🔄 Cargar usuarios al iniciar
  }

  abrirModal(): void {
    this.mostrarModal = true;
    console.log('🔍 Modal abierto para crear usuario');
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.nuevoUsuario = {
      username: '',
      password: '',
      email: '',
      identification: '',
      role: 'USER',
    };
  }

  crearUsuario(): void {
    this.userService.create(this.nuevoUsuario).subscribe({
      next: (res) => {
        alert('✅ Usuario creado correctamente.');
        this.cerrarModal();
        this.obtenerUsuarios(); // 🔄 Actualizar lista al crear
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        alert('❌ Ocurrió un error al crear el usuario.');
      },
    });
  }

  obtenerUsuarios(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log('🔍 Usuarios cargados:', data);
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      },
    });
  }

  eliminarUsuario(id: number): void {
    this.userService.delete({ id }).subscribe({
      next: () => {
        alert('🗑️ Usuario eliminado correctamente.');
        this.obtenerUsuarios(); // 🔁 Refresca la lista
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        alert('❌ Error al eliminar el usuario.');
      },
    });
  }
}
