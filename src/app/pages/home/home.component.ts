import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentSection: string = 'home';  // Sección visible por defecto

  showSection(sectionId: string): void {
    this.currentSection = sectionId;
  }

}




