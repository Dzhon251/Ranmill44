import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MonthSummary, PRICES, PRODUCTION_COSTS } from '../model/meal-data';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { DashboardService } from '../service/dashboard.service';
import { PrimeModule } from '../../../shared/modules/prime-module';
import { MealCardComponent } from "./meal-card/meal-card.component";

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PrimeModule, MealCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('areaChart') areaChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;

    // Hacer las constantes disponibles en el template
  readonly PRICES = PRICES;
  readonly PRODUCTION_COSTS = PRODUCTION_COSTS;

  months = this.dashboardService.getMonths();
  selectedMonth = new Date().getMonth();
  currentData!: MonthSummary;
  
  // Charts
  areaChart?: Chart;
  pieChart?: Chart;
  doughnutChart?: Chart;
  barChart?: Chart;

  showCostAnalysis = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadMonthData(this.selectedMonth);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeCharts();
      this.updateCharts();
    });
  }

  ngOnDestroy() {
    this.areaChart?.destroy();
    this.pieChart?.destroy();
    this.doughnutChart?.destroy();
    this.barChart?.destroy();
  }

  onMonthChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedMonth = parseInt(target.value);
    this.loadMonthData(this.selectedMonth);
    this.updateCharts();
  }

  private loadMonthData(month: number) {
    this.currentData = this.dashboardService.generateMonthData(month);
  }

  private initializeCharts() {
    this.createAreaChart();
    this.createPieChart();
    this.createDoughnutChart();
    this.createBarChart();
  }

  private createAreaChart() {
    const ctx = this.areaChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { title: { display: true, text: 'Consumo Diario', font: { size: 16 } } },
        scales: {
          x: { title: { display: true, text: 'Días del Mes' } },
          y: { title: { display: true, text: 'Cantidad de Comidas' }, beginAtZero: true }
        }
      }
    };

    this.areaChart = new Chart(ctx, config);
  }

  private createPieChart() {
    const ctx = this.pieChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 12 } } },
          title: { display: true, text: 'Distribución de Comidas', font: { size: 16 } }
        }
      }
    };

    this.pieChart = new Chart(ctx, config);
  }

  private createDoughnutChart() {
    const ctx = this.doughnutChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 12 } } },
          title: { display: true, text: 'Desperdicios Registrados', font: { size: 16 } }
        }
      }
    };

    this.doughnutChart = new Chart(ctx, config);
  }

  private createBarChart() {
    const ctx = this.barChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { 
            display: true, 
            text: '', 
            font: { size: 16 } 
          },
          // tooltip: {
          //   callbacks: {
          //     label: function(context) {
          //       return `$${context.raw?.toFixed(2)}`;
          //     }
          //   }
          // }
        },
        scales: {
          x: { title: { display: true, text: 'Conceptos' } },
          y: { 
            title: { display: true, text: 'Monto ($)' },
            beginAtZero: true
          }
        }
      }
    };

    this.barChart = new Chart(ctx, config);
  }

  public updateCharts() {
    if (!this.currentData) return;

    // Actualizar gráfico de áreas
    if (this.areaChart) {
      const days = this.currentData.dailyData.map(item => `Día ${item.day}`);
      this.areaChart.data.labels = days;
      this.areaChart.data.datasets = [
        {
          label: 'Desayunos',
          data: this.currentData.dailyData.map(item => item.breakfast),
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Almuerzos',
          data: this.currentData.dailyData.map(item => item.lunch),
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231, 76, 60, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Meriendas',
          data: this.currentData.dailyData.map(item => item.dinner),
          borderColor: '#f39c12',
          backgroundColor: 'rgba(243, 156, 18, 0.2)',
          fill: true,
          tension: 0.4
        }
      ];
      this.areaChart.update();
    }

    // Actualizar gráfico de pastel
    if (this.pieChart) {
      this.pieChart.data.labels = ['Desayunos', 'Almuerzos', 'Meriendas'];
      this.pieChart.data.datasets = [{
        data: [
          this.currentData.totals.breakfast,
          this.currentData.totals.lunch,
          this.currentData.totals.dinner
        ],
        backgroundColor: ['#3498db', '#e74c3c', '#f39c12'],
        borderWidth: 1
      }];
      this.pieChart.update();
    }

    // Actualizar gráfico de anillos
    if (this.doughnutChart) {
      const wasteData = this.dashboardService.calculateWasteByType(this.currentData.totals.waste);
      this.doughnutChart.data.labels = ['Desayunos', 'Almuerzos', 'Meriendas'];
      this.doughnutChart.data.datasets = [{
        data: [wasteData.wasteBreakfast, wasteData.wasteLunch, wasteData.wasteDinner],
        backgroundColor: ['#3498db', '#e74c3c', '#f39c12'],
        borderWidth: 1
      }];
      this.doughnutChart.update();
    }

    // Actualizar gráfico de barras (costos)
    if (this.barChart) {
      this.barChart.data.labels = [
        'Ingresos Desayunos', 
        'Ingresos Almuerzos', 
        'Ingresos Meriendas',
      ];
      
      this.barChart.data.datasets = [{
        label: 'Monto ($)',
        data: [
          this.currentData.totals.breakfast * this.PRICES.breakfast,
          this.currentData.totals.lunch * this.PRICES.lunch,
          this.currentData.totals.dinner * this.PRICES.dinner,
        ],
        backgroundColor: [
          '#3498db', '#e74c3c', '#f39c12',  // Ingresos
          '#2980b9', '#c0392b', '#d35400',   // Costos
          this.currentData.costAnalysis.profit >= 0 ? '#27ae60' : '#c0392b' // Ganancia
        ],
        borderWidth: 1
      }];
      this.barChart.update();
    }
  }

  get wasteByType() {
    if (!this.currentData) return { wasteBreakfast: 0, wasteLunch: 0, wasteDinner: 0 };
    return this.dashboardService.calculateWasteByType(this.currentData.totals.waste);
  }

  get dailyAverage() {
    if (!this.currentData) return 0;
    const totalMeals = this.currentData.totals.breakfast + this.currentData.totals.lunch + this.currentData.totals.dinner;
    return Math.round(totalMeals / this.currentData.daysInMonth);
  }

  get weeklyCosts() {
    if (!this.currentData) return [];
    return this.dashboardService.getWeeklyCosts(this.currentData.dailyData);
  }

  // Método para calcular el margen de ganancia
  getProfitMargin(): number {
    if (!this.currentData || this.currentData.totals.revenue === 0) return 0;
    return (this.currentData.costAnalysis.profit / this.currentData.totals.revenue) * 100;
  }
}