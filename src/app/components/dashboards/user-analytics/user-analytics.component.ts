



// import { Component, OnInit } from '@angular/core';
// import { RecentUserService } from '../../../services/recent-user.service';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-user-analytics',
//   standalone: true,
//   imports: [NgxChartsModule, CommonModule],
//   templateUrl: './user-analytics.component.html',
//   styleUrls: ['./user-analytics.component.css']
// })
// export class UserAnalyticsComponent implements OnInit {
//   recentUsers: any[] = [];
//   userSignupData: any[] = [];
//   roleDistribution: any[] = [];
//   activeUserData: any[] = [];

//   constructor(private recentUserService: RecentUserService) {}

//   ngOnInit(): void {
//     this.loadRecentUsers();
//   }

// loadRecentUsers(): void {
//   this.recentUserService.getRecentUsers().subscribe(users => {
//     console.log("✅ Users Loaded:", users);
//     this.recentUsers = users;

//     if (users.length === 0) {
//       console.warn("⚠ No users retrieved! Check API response.");
//     }

//     // Check if signup trends are generated correctly
//     const signupMap: { [key: string]: number } = {};
//     users.forEach(user => {
//       const date = user.createdAt.split('T')[0];
//       signupMap[date] = (signupMap[date] || 0) + 1;
//     });

//     this.userSignupData = Object.keys(signupMap).map(date => ({
//       name: date,
//       value: signupMap[date]
//     }));

//     console.log("📊 Signup Data Generated:", this.userSignupData);

//     // Role distribution
//     const roles = { Admin: 0, User: 0 };
//     users.forEach(u => {
//       if (u.role === 1) roles.Admin++;
//       else roles.User++;
//     });

//     this.roleDistribution = [
//       { name: 'Admin', value: roles.Admin },
//       { name: 'User', value: roles.User }
//     ];

//     console.log("📌 Role Distribution:", this.roleDistribution);

//     // Active users today
//    const today = new Date().toISOString().split('T')[0]; // ✅ Get today's date in YYYY-MM-DD format
// console.log("📅 Today's Date:", today);

// let activeCount = 0;

//     users.forEach(user => {
//   if (user.lastLoginDate && typeof user.lastLoginDate === 'string') { // ✅ Ensure lastLoginDate is not null
//     const loginDate = user.lastLoginDate.split('T')[0]; // ✅ Extract date part
//     console.log(`🔍 Checking user ${user.id}: Last Login = ${loginDate}`);
//     if (loginDate === today) activeCount++;
//   } else {
//     console.warn(`⚠ User ${user.id} has no valid lastLoginDate!`, user.lastLoginDate);
//   }
// });


//     this.activeUserData = [
//       { name: 'Active Today', value: activeCount },
//       { name: 'Inactive', value: users.length - activeCount }
//     ];

//     console.log("🔥 Active User Data:", this.activeUserData);
//   });
// }
//   // Ensure y-axis only displays multiples of 10
//   yAxisTickFormatting = (value: number) => {
//     return value % 10 === 0 ? value : ''; // ✅ Shows only multiples of 10
//   };
// }





// import { Component, OnInit } from '@angular/core';
// import { RecentUserService } from '../../../services/recent-user.service';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-user-analytics',
//   standalone: true,
//   imports: [NgxChartsModule, CommonModule],
//   templateUrl: './user-analytics.component.html',
//   styleUrls: ['./user-analytics.component.css']
// })
// export class UserAnalyticsComponent implements OnInit {
//   recentUsers: any[] = [];
//   userSignupData: any[] = [];
//   roleDistribution: any[] = [];
//   activeUserData: any[] = [];

//   constructor(private recentUserService: RecentUserService) {}

//   ngOnInit(): void {
//     this.loadRecentUsers();
//   }

// loadRecentUsers(): void {
//   this.recentUserService.getRecentUsers().subscribe(users => {
//     console.log("✅ Users Loaded:", users);
//     this.recentUsers = users;

//     if (users.length === 0) {
//       console.warn("⚠ No users retrieved! Check API response.");
//     }

   
//     const signupMap: { [key: string]: number } = {};
//     users.forEach(user => {
//       const date = user.createdAt.split('T')[0];
//       signupMap[date] = (signupMap[date] || 0) + 1;
//     });

//     this.userSignupData = Object.keys(signupMap).map(date => ({
//       name: date,
//       value: signupMap[date]
//     }));

//     console.log("📊 Signup Data Generated:", this.userSignupData);

    
//     const roles = { Admin: 0, User: 0 };
//     users.forEach(u => {
//       if (u.role === 1) roles.Admin++;
//       else roles.User++;
//     });

//     this.roleDistribution = [
//       { name: 'Admin', value: roles.Admin },
//       { name: 'User', value: roles.User }
//     ];

//     console.log("📌 Role Distribution:", this.roleDistribution);

    
//    const today = new Date().toISOString().split('T')[0]; 
// console.log("📅 Today's Date:", today);

// let activeCount = 0;

//     users.forEach(user => {
//   if (user.lastLoginDate && typeof user.lastLoginDate === 'string') { 
//     const loginDate = user.lastLoginDate.split('T')[0]; 
//     console.log(`🔍 Checking user ${user.id}: Last Login = ${loginDate}`);
//     if (loginDate === today) activeCount++;
//   } else {
//     console.warn(`⚠ User ${user.id} has no valid lastLoginDate!`, user.lastLoginDate);
//   }
// });


//     this.activeUserData = [
//       { name: 'Active Today', value: activeCount },
//       { name: 'Inactive', value: users.length - activeCount }
//     ];

//     console.log("🔥 Active User Data:", this.activeUserData);
//   });
// }
  
//   yAxisTickFormatting = (value: number) => {
//     return value % 10 === 0 ? value : ''; 
//   };
// }


import { Component, OnInit } from '@angular/core';
import { RecentUserService } from '../../../services/recent-user.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-analytics',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.css']
})
export class UserAnalyticsComponent implements OnInit {
  recentUsers: any[] = [];
  userSignupData: any[] = [];
  roleDistribution: any[] = [];
  activeUserData: any[] = [];
  isLoading = true;

  // Color schemes for charts
  barChartColorScheme = {
    domain: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe']
  };

  pieChartColorScheme = {
    domain: ['#667eea', '#764ba2', '#f093fb', '#f5576c']
  };

  activeUserColorScheme = {
    domain: ['#10b981', '#e5e7eb']
  };

  constructor(private recentUserService: RecentUserService) {}

  ngOnInit(): void {
    this.loadRecentUsers();
  }

  loadRecentUsers(): void {
    this.isLoading = true;
    
    // Add a small delay to show loading animation
    setTimeout(() => {
      this.recentUserService.getRecentUsers().subscribe({
        next: (users) => {
          console.log("✅ Users Loaded:", users);
          this.recentUsers = users;
          
          if (users.length === 0) {
            console.warn("⚠ No users retrieved! Check API response.");
          }
          
          this.generateSignupData(users);
          this.generateRoleDistribution(users);
          this.generateActiveUserData(users);
          
          this.isLoading = false;
        },
        error: (error) => {
          console.error("❌ Error loading users:", error);
          this.isLoading = false;
        }
      });
    }, 1000); // 1 second delay for smooth loading experience
  }

  private generateSignupData(users: any[]): void {
    // Check if signup trends are generated correctly
    const signupMap: { [key: string]: number } = {};
    users.forEach(user => {
      if (user.createdAt) {
        const date = user.createdAt.split('T')[0];
        signupMap[date] = (signupMap[date] || 0) + 1;
      }
    });
    
    this.userSignupData = Object.keys(signupMap)
      .sort() // Sort dates chronologically
      .map(date => ({
        name: this.formatDate(date),
        value: signupMap[date]
      }));
    
    console.log("📊 Signup Data Generated:", this.userSignupData);
  }

  private generateRoleDistribution(users: any[]): void {
    // Role distribution
    const roles = { Admin: 0, User: 0 };
    users.forEach(u => {
      if (u.role === 1) roles.Admin++;
      else roles.User++;
    });
    
    this.roleDistribution = [
      { name: 'Admin', value: roles.Admin },
      { name: 'User', value: roles.User }
    ];
    
    console.log("📌 Role Distribution:", this.roleDistribution);
  }

  private generateActiveUserData(users: any[]): void {
    // Active users today
    const today = new Date().toISOString().split('T')[0]; // ✅ Get today's date in YYYY-MM-DD format
    console.log("📅 Today's Date:", today);
    
    let activeCount = 0;
    users.forEach(user => {
      if (user.lastLoginDate && typeof user.lastLoginDate === 'string') { // ✅ Ensure lastLoginDate is not null
        const loginDate = user.lastLoginDate.split('T')[0]; // ✅ Extract date part
        console.log(`🔍 Checking user ${user.id}: Last Login = ${loginDate}`);
        if (loginDate === today) activeCount++;
      } else {
        console.warn(`⚠ User ${user.id} has no valid lastLoginDate!`, user.lastLoginDate);
      }
    });
    
    this.activeUserData = [
      { name: 'Active Today', value: activeCount },
      { name: 'Inactive', value: users.length - activeCount }
    ];
    
    console.log("🔥 Active User Data:", this.activeUserData);
  }

  // Utility methods for the template
  getInitials(firstName: string, lastName: string): string {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  }

  isActiveToday(lastLoginDate: string): boolean {
    if (!lastLoginDate) return false;
    const today = new Date().toISOString().split('T')[0];
    const loginDate = lastLoginDate.split('T')[0];
    return loginDate === today;
  }

  getTodayActiveCount(): number {
    const today = new Date().toISOString().split('T')[0];
    return this.recentUsers.filter(user => {
      if (!user.lastLoginDate) return false;
      const loginDate = user.lastLoginDate.split('T')[0];
      return loginDate === today;
    }).length;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }

  // Ensure y-axis only displays multiples of 10
  yAxisTickFormatting = (value: number): string => {
    return value % 10 === 0 ? value.toString() : ''; // ✅ Shows only multiples of 10
  };

  // Animation and interaction methods
  onChartSelect(event: any): void {
    console.log('Chart selection:', event);
  }

  onChartActivate(event: any): void {
    console.log('Chart activate:', event);
  }

  onChartDeactivate(event: any): void {
    console.log('Chart deactivate:', event);
  }

  // Refresh data method
  refreshData(): void {
    this.loadRecentUsers();
  }

  // Export data methods (future enhancement)
  exportToCSV(): void {
    console.log('Exporting data to CSV...');
    // Implementation for CSV export
  }

  exportToPDF(): void {
    console.log('Exporting dashboard to PDF...');
    // Implementation for PDF export
  }
}

