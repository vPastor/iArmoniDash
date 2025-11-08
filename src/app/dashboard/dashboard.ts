import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';
import { FormsModule } from '@angular/forms';

// Registrar componentes de Chart.js (necesario en v4)
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  template: `
    <h2>Resumen del Dashboard</h2>

    <div class="kpis" *ngIf="summary">
      <div class="kpi">
        <h3>Total de ítems</h3>
        <p>{{ summary.total_items }}</p>
      </div>
      <div class="kpi">
        <h3>Ítems faltantes</h3>
        <p>{{ summary.total_missing_items }}</p>
      </div>
      <div class="kpi">
        <h3>Procedimientos totales</h3>
        <p>{{ summary.total_procedures }}</p>
      </div>
    </div>

    <h3>Procedimientos por mes:</h3>
    <table border="1" cellpadding="5" *ngIf="summary?.procedures_per_month">
      <tr>
        <th>Mes</th>
        <th>Cantidad</th>
      </tr>
      <tr *ngFor="let item of getProceduresPerMonth()">
        <td>{{ item.mes }}</td>
        <td>{{ item.valor }}</td>
      </tr>
    </table>

    <h3 style="margin-top: 1rem;">Gráfico de procedimientos por mes:</h3>
    <canvas
      baseChart
      [data]="chartData"
      [type]="'bar'"
      [options]="chartOptions">
    </canvas>
    <!-- Filtro por mes (vive dentro del dashboard) -->
<div *ngIf="summary?.procedures_per_month" style="margin: .5rem 0;">
  <label for="mes">Filtrar por mes: </label>
  <select id="mes" [(ngModel)]="selectedMonth" (ngModelChange)="onMonthChange()">
    <option [ngValue]="null">Todos</option>
    <option *ngFor="let kv of (summary?.procedures_per_month | keyvalue)" [value]="kv.key">
      {{ kv.key }}
    </option>
  </select>
</div>
  `,
  styles: [`
    .kpis { display: flex; gap: 1rem; margin-bottom: 1rem; }
    .kpi { flex: 1; background: #f4f4f4; padding: 1rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,.1); }
    .kpi h3 { margin: 0; font-size: 1.1rem; color: #333; }
    .kpi p { font-size: 1.5rem; font-weight: bold; margin: .5rem 0 0; }
  `]
})
export class Dashboard implements OnChanges {
  @Input() summary: any;
  
  // Datos del gráfico (formato requerido por ng2-charts v5)
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

  ngOnChanges(changes: SimpleChanges): void {
    if ('summary' in changes) {
      this.updateChart();
    }
  }

  selectedMonth: string | null = null;

getProceduresPerMonth() {
  if (!this.summary?.procedures_per_month) return [];
  let entries = Object.entries(this.summary.procedures_per_month) as [string, number][];
  if (this.selectedMonth) entries = entries.filter(([m]) => m === this.selectedMonth);
  return entries.map(([mes, valor]) => ({ mes, valor }));
}

onMonthChange() {
  this.updateChart(); // refresca el gráfico cuando cambia el mes
}

  private updateChart() {
    if (!this.summary?.procedures_per_month) {
      this.chartData = { labels: [], datasets: [{ data: [], label: 'Procedimientos' }] };
      return;
    }
    const entries = Object.entries(this.summary.procedures_per_month) as [string, number][];
    this.chartData = {
      labels: entries.map(([mes]) => mes),
      datasets: [{ data: entries.map(([, v]) => Number(v)), label: 'Procedimientos' }]
    };
  }
}