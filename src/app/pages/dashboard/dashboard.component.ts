import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, FormsModule, CommonModule],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public chartOptions: ChartOptions = {
    series: [],
    chart: { type: 'line', height: 350 },
    title: { text: 'Señales', align: 'center' },
    xaxis: { categories: [] },
  };

  public identification: string = ''; // input del usuario
  

  signals: any[] = []; // todas las señales
  currentIndex: number = 0; // índice actual que estás graficando
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // vacío por ahora
  }

  loadSignal(): void {
    if (!this.identification.trim()) return;

    this.dashboardService.getSignalsByUserId(this.identification).subscribe({
      next: (signals) => {
        if (!signals || signals.length === 0) {
          alert('No se encontraron señales para esta identificación.');
          return;
        }

        this.signals = signals;
        this.currentIndex = 0;
        this.plotCurrentSignal();
        console.log('Señales cargadas:', this.signals);
    

      },
      error: (err) => {
        console.error('Error al cargar señales:', err);
        alert('Error al consultar las señales.');
      },
    });
  }

  plotCurrentSignal(): void {
    const signal = this.signals[this.currentIndex];

    this.chartOptions = {
      series: [
        {
          name: signal.type,
          data: signal.data,
        },
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      title: {
        text: `Señal ${this.currentIndex + 1} de ${this.signals.length} - ${
        signal.type 
        } - ${this.formatDate(signal.created_at)}`,
        align: 'center',
      },
      xaxis: {
        categories: signal.time_signal,
        title: {
          text: 'Tiempo (s)',
        },
      },
    };
  }

  formatDate(dateString: string): string {
  const date = new Date(dateString);

  const time = date.toLocaleTimeString('es-CO', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = date.toLocaleDateString('es-CO'); // dd/mm/yyyy

  return `${time} ${formattedDate}`; // ejemplo: 8:27 a. m. 28/05/2025
}


  nextSignal(): void {
    if (this.currentIndex < this.signals.length - 1) {
      this.currentIndex++;
      this.plotCurrentSignal();
    }
  }

  previousSignal(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.plotCurrentSignal();
    }
  }
}
