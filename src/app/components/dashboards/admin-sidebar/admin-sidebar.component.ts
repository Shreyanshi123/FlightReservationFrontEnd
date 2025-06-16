// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-admin-sidebar',
//   imports: [CommonModule,RouterLink],
//   templateUrl: './admin-sidebar.component.html',
//   styleUrl: './admin-sidebar.component.css'
// })
// export class AdminSidebarComponent {
//   menuItems = [
//     { name: 'Admin Dashboard', route: '/dashboard', icon: '🏠' },
//     { name: 'Users Management', route: '/dashboard/users', icon: '👥' },
//     { name: 'User Analytics', route: '/dashboard/user-analytics', icon: '💡' },
//     {name:'User Reservations', route:'/dashboard/userswithreservations',icon: '💡'},
//       { name: 'Schedule Flights', route: '/dashboard/dashboard/schedule', icon: '🕒' },
//     { name: ' Booking Analytics', route: '/dashboard/admin-analytics', icon: '📊' },
//     { name: 'Popular Flights Analytics', route: '/dashboard/popularFlights', icon: '✈️' },
  
    
//   ];
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
 
@Component({
  selector: 'app-admin-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit {
  
menuItems = [
  { name: 'Admin Dashboard', route: '/dashboard', icon: '🏠' }, // Home
  { name: 'Users Management', route: '/dashboard/users', icon: '👤' }, // Single User
  { name: 'User Analytics', route: '/dashboard/user-analytics', icon: '📊' }, // Analytics Graph
  { name: 'User Reservations', route: '/dashboard/userswithreservations', icon: '📝' }, // Document/Reservations
  { name: 'Reservation Charts', route: '/dashboard/chart', icon: '📉' }, // Chart Downward
  { name: 'Schedule Flights', route: '/dashboard/schedule', icon: '🛫' }, // Plane Taking Off
  { name: 'Booking Analytics', route: '/dashboard/admin-analytics', icon: '📈' }, // Chart Upward
  { name: 'Popular Flights Analytics', route: '/dashboard/popularFlights', icon: '🌍' }, // Globe for Popular Flights
];
 
  isMobile = false;
  sidebarOpen = false;
 
  ngOnInit() {
    this.checkScreenSize();
  }
 
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }
 
  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.sidebarOpen = true;
    }
  }
 
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
 
  closeSidebar() {
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }
}
 