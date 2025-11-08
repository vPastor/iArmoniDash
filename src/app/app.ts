import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';       // 👈 añade esto
import { AuthService } from './core/auth';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js'; // 👈 importa registrables
Chart.register(...registerables);


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, BaseChartDirective], // 👈 añade FormsModule aquí
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private auth: AuthService) { }
  isLoading = false;
  // variables ligadas a los inputs
  user = '';
  pass = '';
  isAuthenticated = false;

  apiRespuesta: any = null;
  protected readonly title = signal('iArmoniDash');
  selectedMonth: string | null = null; // mes seleccionado (ej. "2025-09")
logout() {
  this.isAuthenticated = false;
  this.apiRespuesta = null;
  this.user = '';
  this.pass = '';
}
obtenerProceduresPorMes() {
  if (!this.apiRespuesta?.procedures_per_month) return [];
  let entries = Object.entries(this.apiRespuesta.procedures_per_month) as [string, number][];
  if (this.selectedMonth) {
    entries = entries.filter(([mes]) => mes === this.selectedMonth);
  }
  return entries.map(([mes, valor]) => ({ mes, valor }));
}
  // Datos para el gráfico (inicialmente vacíos)
chartData: ChartData<'bar'> = {
  labels: [],
  datasets: [{ data: [], label: 'Procedimientos' }]
};

chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: { display: true },
    title: { display: true, text: 'Procedimientos por mes' }
  }
};

private actualizarGrafico() {
  if (!this.apiRespuesta?.procedures_per_month) return;

  let entries = Object.entries(this.apiRespuesta.procedures_per_month) as [string, number][];

  // filtra si hay mes seleccionado
  if (this.selectedMonth) {
    entries = entries.filter(([mes]) => mes === this.selectedMonth);
  }

  this.chartData = {
    labels: entries.map(([mes]) => mes),
    datasets: [{ data: entries.map(([, valor]) => Number(valor)), label: 'Procedimientos' }]
  };
}
onMonthChange() {
  this.actualizarGrafico();
}
 probarApi() {
  this.isLoading = true;                      // ⬅️ empieza carga
  this.apiRespuesta = { estado: 'pidiendo refresh token...' };

  this.auth.getRefreshToken(this.user, this.pass).subscribe({
    next: (refresh) => {
      this.apiRespuesta = { estado: 'obteniendo access token...' };

      this.auth.getAccessToken(refresh.token).subscribe({
        next: (access) => {
          this.apiRespuesta = { estado: 'llamando al dashboard...' };

          this.auth.getDashboardSummary(access.token).subscribe({
            next: (summary) => {
              this.isAuthenticated = true; // marcar sesión iniciada
              this.apiRespuesta = summary;
              this.actualizarGrafico();   // 👈 vuelve a poblar labels y datos del chart
              this.isLoading = false;         // ⬅️ fin OK
            },
            error: (err) => {
              this.apiRespuesta = { error: 'Error en dashboard_summary', detalle: err };
              this.isLoading = false;         // ⬅️ fin con error
            }
          });
        },
        error: (err) => {
          this.apiRespuesta = { error: 'Error obteniendo access token', detalle: err };
          this.isLoading = false;             // ⬅️ fin con error
        }
      });
    },
    error: (err) => {
      this.apiRespuesta = { error: 'Error obteniendo refresh token', detalle: err };
      this.isLoading = false;                 // ⬅️ fin con error
    }
  });
}
}