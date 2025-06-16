// import { Component, OnInit, ViewChild } from '@angular/core';
// import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
// import { BookingService } from '../../../services/booking.service';
// import { BaseChartDirective } from 'ng2-charts';
// import { Chart, registerables } from 'chart.js';
// import { CommonModule } from '@angular/common';

// Chart.register(...registerables);

// @Component({
//   selector: 'app-reservation-chart',
//   standalone: true,
//   imports: [BaseChartDirective,CommonModule],
//   templateUrl: './reservation-chart.component.html',
//   styleUrls: ['./reservation-chart.component.css']
// })
// export class ReservationChartComponent implements OnInit {
//   @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

//   public barChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' }
//     }
//   };

//   public barChartType: ChartType = 'bar';
//   public barChartData: ChartData<'bar'> = {
//     labels: [],
//     datasets: []
//   };

//   constructor(private bookingService: BookingService) {}

//   ngOnInit(): void {
//     this.loadReservationData();
//   }

//  loadReservationData(): void {
//   this.bookingService.getReservationStatusSummary().subscribe(data => {
//     const labels = data.map(flight => flight.flightNumber);
//     const confirmedCounts = data.map(flight => flight.statusCounts?.find((s: { status: number; count: number }) => s.status === 0)?.count || 0);
//     const pendingCounts = data.map(flight => flight.statusCounts?.find((s: { status: number; count: number }) => s.status === 1)?.count || 0);
//     const cancelledCounts = data.map(flight => flight.statusCounts?.find((s: { status: number; count: number }) => s.status === 2)?.count || 0);
//     const refundedCounts = data.map(flight => flight.statusCounts?.find((s: { status: number; count: number }) => s.status === 3)?.count || 0);

//     this.barChartData = {
//       labels: labels,
//       datasets: [
//         { label: "Confirmed", data: confirmedCounts, backgroundColor: "green" },
//         { label: "Pending", data: pendingCounts, backgroundColor: "yellow" },
//         { label: "Cancelled", data: cancelledCounts, backgroundColor: "red" },
//         { label: "Refunded", data: refundedCounts, backgroundColor: "blue" }
//       ]
//     };
//   });
// }
// }

// import { Component, OnInit } from '@angular/core';
// import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
// import { BookingService } from '../../../services/booking.service';
// import { BaseChartDirective } from 'ng2-charts';
// import { Chart, registerables } from 'chart.js';
// import { CommonModule } from '@angular/common';

// Chart.register(...registerables);

// @Component({
//   selector: 'app-reservation-chart',
//   standalone: true,
//   imports: [BaseChartDirective, CommonModule],
//   templateUrl: './reservation-chart.component.html',
//   styleUrls: ['./reservation-chart.component.css'],
// })
// export class ReservationChartComponent implements OnInit {
//   public flightCharts: { flightNumber: string; chartData: ChartData<'bar'> }[] =
//     [];
//   public barChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     maintainAspectRatio: false, // ✅ Allows better height adjustment
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { 
//         stepSize: 10, // ✅ Locks scaling to multiples of 10
//           color: '#333', // ✅ Darker text for readability
//           font: { size: 14 },
//         },
//       },
//       x: {
//         ticks: {
//           color: '#333',
//           font: { size: 14 },
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         labels: {
//           color: '#333', // ✅ Improve contrast
//           font: { size: 14 },
//         },
//       },
//     },
//   };

  
//   public barChartType: ChartType = 'bar';

//   constructor(private bookingService: BookingService) {}

//   ngOnInit(): void {
//     this.loadReservationData();
//   }

//   loadReservationData(): void {
//     this.bookingService.getReservationStatusSummary().subscribe((data) => {
//       this.flightCharts = data.map((flight) => ({
//         flightNumber: flight.flightNumber,
//         chartData: {
//           labels: ['Confirmed', 'Pending', 'Cancelled', 'Refunded'],
//           datasets: [
//             {
//               label: 'Reservations',
//               data: flight.statusCounts.map(
//                 (s: { status: number; count: number }) => s.count
//               ),
//               backgroundColor: ['#5bcc70', '#f5c401', '#d74c3d', '#3798dc'], // ✅ Vibrant modern colors
//               borderColor: ['#27ae61', '#f39c11', '#c0392c', '#2980b9'], // ✅ Border colors for clarity
//               borderWidth: 2,
//               hoverBackgroundColor: [
//                 '#58d68d',
//                 '#f7dc6f',
//                 '#ec7063',
//                 '#5dade2',
//               ], // ✅ Changes color on hover
//             },
//           ],
//         },
//       }));
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BookingService } from '../../../services/booking.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-reservation-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reservation-chart.component.html',
  styleUrls: ['./reservation-chart.component.css'],
})
export class ReservationChartComponent implements OnInit {
  public flightCharts: { flightNumber: string; chartData: ChartData<'bar'> }[] = [];
  public isLoading = true;
  public hasError = false;
  public errorMessage = '';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          stepSize: 10,
          color: '#94a3b8',
          font: { 
            size: 12
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: { 
            size: 12
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        cornerRadius: 8,
        padding: 12,
      },
    },
  };

  public barChartType: ChartType = 'bar';

  public statusInfo = [
    { label: 'Confirmed', color: '#10b981', icon: '✓' },
    { label: 'Pending', color: '#f59e0b', icon: '⏳' },
    { label: 'Cancelled', color: '#ef4444', icon: '✕' },
    { label: 'Refunded', color: '#3b82f6', icon: '↩' },
  ];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadReservationData();
  }

  loadReservationData(): void {
    this.isLoading = true;
    this.hasError = false;
    
    this.bookingService.getReservationStatusSummary().subscribe({
      next: (data: any) => {
        this.flightCharts = data.map((flight: any) => ({
          flightNumber: flight.flightNumber,
          chartData: {
            labels: ['Confirmed', 'Pending', 'Cancelled', 'Refunded'],
            datasets: [
              {
                label: 'Reservations',
                data: flight.statusCounts.map((s: any) => s.count),
                backgroundColor: [
                  'rgba(16, 185, 129, 0.8)',
                  'rgba(245, 158, 11, 0.8)',
                  'rgba(239, 68, 68, 0.8)',
                  'rgba(59, 130, 246, 0.8)',
                ],
                borderColor: [
                  '#10b981',
                  '#f59e0b',
                  '#ef4444',
                  '#3b82f6',
                ],
                borderWidth: 2,
                hoverBackgroundColor: [
                  'rgba(16, 185, 129, 1)',
                  'rgba(245, 158, 11, 1)',
                  'rgba(239, 68, 68, 1)',
                  'rgba(59, 130, 246, 1)',
                ],
              },
            ],
          },
        }));
        this.isLoading = false;
      },
      error: (error: any) => {
        this.hasError = true;
        this.errorMessage = 'Failed to load reservation data. Please try again.';
        this.isLoading = false;
        console.error('Error loading reservation data:', error);
      }
    });
  }

  retryLoad(): void {
    this.loadReservationData();
  }

  getTotalReservations(chartData: ChartData<'bar'>): number {
    return chartData.datasets[0].data.reduce((sum: number, count) => sum + Number(count), 0);
  }

  trackByFlightNumber(index: number, item: any): string {
    return item.flightNumber;
  }
}




