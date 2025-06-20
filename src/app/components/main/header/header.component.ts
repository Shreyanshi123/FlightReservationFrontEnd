import { Component, inject, type OnInit, type OnDestroy, HostListener } from "@angular/core"
import { Router, RouterLink, RouterLinkActive, NavigationEnd, RouterModule } from "@angular/router"
import { AuthService } from "../../../services/auth.service"
import { CommonModule } from "@angular/common"
import { Subject, takeUntil, filter } from "rxjs"
import { FormsModule } from "@angular/forms"
import { SignalrService } from "../../../services/signalr.service"

interface NavItem {
  label: string
  route: string
  icon?: string
  exact?: boolean

  primary?: boolean; // for highlighting (e.g., CTA)
  logout?: boolean;  // for logout styling

}

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, FormsModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()

  authService = inject(AuthService)
  router = inject(Router)

  // Component state
  isLoggedIn = false
  isScrolled = false
  isMobileNavOpen = false
  isUserMenuOpen = false
  logoAnimated = false
  userName = ""
  userAvatar = ""
  userEmail = ""
  hasToken = false
  notifications: any;
  showNotifications = false;

  // Navigation items
  defaultNavItems: NavItem[] = [
    {
      label: "Home",
      route: "",
      icon: "home",
      exact: true,
    },
    {
      label: "About Us",
      route: "about",
      icon: "users",
    },
    {
      label: "Contact Us",
      route: "contact",
      icon: "phone",
    },
  ]

  readonly registerNavItem: NavItem = {
    label: "Register",
    route: "dashboard/register",
    icon: "user-plus",
  }

  navItems: NavItem[] = []

  // Notifications
  hasNotifications = true
  notificationCount = 0
  // notifications :any;
  newNotification:any;
  // Add these properties to your component
// showNotifications = false;

// Sample notifications data structure to work with your SignalR notifications
sampleNotifications = [
  {
    message: "Your flight SKW123 to Mumbai has been confirmed",
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    isUnread: true,
    isNew: true,
    type: 'booking'
  },
  {
    message: "Check-in is now open for flight SKW456",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isUnread: true,
    isNew: false,
    type: 'system'
  },
  {
    message: "Special offer: 20% off on domestic flights",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isUnread: false,
    isNew: false,
    type: 'promotion'
  }
];

// Add these methods to your component class

toggleNotifications(): void {
  this.showNotifications = !this.showNotifications;
}

// Track notifications for *ngFor performance
trackNotification(index: number, notification: any): any {
  return notification.timestamp || index;
}

// Get notification title - handles both string messages and object notifications
getNotificationTitle(notification: any): string {
  if (typeof notification === 'string') {
    return notification.length > 50 ? notification.substring(0, 50) + '...' : notification;
  }
  return notification.title || notification.message || 'New Notification';
}

// Get notification message
getNotificationMessage(notification: any): string {
  if (typeof notification === 'string') {
    return notification;
  }
  return notification.message || notification.title || 'You have a new notification';
}

// Get notification type for styling
getNotificationType(notification: any): string {
  if (typeof notification === 'string') {
    // Try to determine type from message content
    const message = notification.toLowerCase();
    if (message.includes('flight') || message.includes('booking') || message.includes('confirmed')) {
      return 'booking';
    } else if (message.includes('offer') || message.includes('discount') || message.includes('%')) {
      return 'promotion';
    }
    return 'system';
  }
  return notification.type || 'system';
}

// Get notification avatar
getNotificationAvatar(notification: any): string {
  const type = this.getNotificationType(notification);
  switch (type) {
    case 'booking':
      return '✈️';
    case 'promotion':
      return '🎉';
    case 'system':
      return '📢';
    default:
      return '📬';
  }
}

// Format time ago
getTimeAgo(notification: any): string {
  let timestamp: Date;
  
  if (typeof notification === 'string') {
    // For string notifications, use current time
    timestamp = new Date();
  } else {
    timestamp = notification.timestamp || new Date();
  }
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
}

// Handle notification click
onNotificationClick(notification: any, index?: number): void {
  // Mark as read if it's unread
  if (typeof notification === 'object' && notification.isUnread) {
    notification.isUnread = false;
    notification.isNew = false;
    this.updateNotificationCount();
  }
  
  // Handle navigation or action based on notification type
  const type = this.getNotificationType(notification);
  switch (type) {
    case 'booking':
      // Navigate to booking details
      this.router.navigate(['/booking-history']);
      break;
    case 'system':
      // Handle system notification
      console.log('System notification clicked');
      break;
    case 'promotion':
      // Navigate to offers page
      this.router.navigate(['/offers']);
      break;
  }
  
  this.showNotifications = false;
}

// Mark all notifications as read
markAllAsRead(): void {
  this.notifications.forEach((notification: any) => {
    if (typeof notification === 'object') {
      notification.isUnread = false;
      notification.isNew = false;
    }
  });
  this.updateNotificationCount();
}

// Clear all notifications
clearAllNotifications(): void {
  this.notifications = [];
  this.notificationCount = 0;
  this.hasNotifications = false;
}

// View all notifications (navigate to dedicated page)
viewAllNotifications(): void {
  this.router.navigate(['/notifications']);
  this.showNotifications = false;
}

// Update notification count
private updateNotificationCount(): void {
  this.notificationCount = this.notifications.filter((notification: any) => {
    return typeof notification === 'string' || notification.isUnread;
  }).length;
  this.hasNotifications = this.notificationCount > 0;
}

// Enhanced ngOnInit to handle notification processing

// Determine notification type from message content
private determineNotificationType(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('flight') || 
  lowerMessage.includes('booking') || 
  lowerMessage.includes('confirmed') ||
  lowerMessage.includes('check-in')) {
    return 'booking';
  } else if (lowerMessage.includes('offer') || 
  lowerMessage.includes('discount') || 
  lowerMessage.includes('%') ||
  lowerMessage.includes('sale')) {
    return 'promotion';
  }
  
  return 'system';
}




  // Scroll threshold for header styling
  private scrollThreshold = 50

  constructor(private signalRService: SignalrService) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.closeMobileNav()
        this.closeUserMenu()
      })
  }
//  toggleNotifications(): void {
//     this.showNotifications = !this.showNotifications;
//   }

  ngOnInit(): void {
  //   this.signalRService.startConnection().then(()=>{
  //     this.signalRService.listenForNotifications((message: string) => {
  //     this.notifications.unshift(message); // ✅ Add latest notification at the top
  //   });
  // })

   this.notifications = [...this.sampleNotifications];
  this.updateNotificationCount();
  
  this.signalRService.startConnection().then(() => {
    this.signalRService.listenForNotifications((message: string) => {
      // Create notification object from SignalR message
      const newNotification = {
        message: message,
        timestamp: new Date(),
        isUnread: true,
        isNew: true,
        type: this.determineNotificationType(message)
      };
      
      this.notifications.unshift(newNotification);
      this.updateNotificationCount();
      
      // Remove 'new' flag after 5 seconds
      setTimeout(() => {
        if (newNotification.isNew) {
          newNotification.isNew = false;
        }
      }, 5000);
    });
  });

    this.checkLoginStatus()
    this.checkTokenPresence()
    this.checkScrollPosition()

    // Debug logging
    console.log('Header Component Initialized');
    console.log('Initial isLoggedIn:', this.isLoggedIn);
    console.log('Initial hasToken:', this.hasToken);

    this.authService.authState$.pipe(takeUntil(this.destroy$)).subscribe((authState) => {
      console.log('Auth state changed:', authState);
      
      this.isLoggedIn = this.authService.isAuthenticated()
      this.userName = this.authService.getUserName()
      
      // Safe email extraction
      const userData = this.authService.getUserData()
      this.userEmail = userData?.user?.email || userData?.email || ""
      this.userAvatar = this.generateAvatar(this.userName)
      this.checkTokenPresence()

      console.log('Updated values:', {
        isLoggedIn: this.isLoggedIn,
        userName: this.userName,
        userEmail: this.userEmail,
        hasToken: this.hasToken
      });

      this.navItems = this.isLoggedIn
        ? [...this.defaultNavItems]
        : [...this.defaultNavItems, this.registerNavItem]
    })

    // Listen for storage changes
    window.addEventListener("storage", (e) => {
      if (e.key === "token") {
        this.checkTokenPresence()
        this.checkLoginStatus()
      }
    })
  }


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
    window.removeEventListener("storage", this.checkTokenPresence)
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(): void {
    this.checkScrollPosition()
  }

  @HostListener("window:resize", ["$event"])
  onWindowResize(): void {
    if (window.innerWidth > 768 && this.isMobileNavOpen) {
      this.closeMobileNav()
    }
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement
    const userMenu = target.closest(".user-menu")
    const mobileToggle = target.closest(".mobile-toggle")

    if (!userMenu && this.isUserMenuOpen) {
      this.closeUserMenu()
    }
    if (!mobileToggle && !target.closest(".mobile-nav") && this.isMobileNavOpen) {
      this.closeMobileNav()
    }
  }

  @HostListener("document:keydown.escape", ["$event"])
  onEscapeKey(): void {
    this.closeMobileNav()
    this.closeUserMenu()
  }

  checkTokenPresence(): void {
    const token = localStorage.getItem("token")
    this.hasToken = !!token && token.trim() !== ""
    console.log('Token check - hasToken:', this.hasToken);
  }

  generateAvatar(name: string): string {
    if (!name) return "G"
    const nameParts = name.trim().split(/\s+/)
    return nameParts.length > 1
      ? nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase()
      : nameParts[0][0].toUpperCase()
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isAuthenticated()
    console.log('Login status check - isLoggedIn:', this.isLoggedIn);
  }

  private checkScrollPosition(): void {
    this.isScrolled = window.scrollY > this.scrollThreshold
  }

  toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen
    document.body.style.overflow = this.isMobileNavOpen ? "hidden" : ""
  }

  closeMobileNav(): void {
    this.isMobileNavOpen = false
    document.body.style.overflow = ""
  }

  toggleUserMenu(): void {
    console.log('Toggle user menu - current state:', this.isUserMenuOpen);
    this.isUserMenuOpen = !this.isUserMenuOpen
    console.log('Toggle user menu - new state:', this.isUserMenuOpen);
  }

  closeUserMenu(): void {
    console.log('Closing user menu');
    this.isUserMenuOpen = false
  }

  // toggleNotifications(): void {
  //   console.log("Toggle notifications")
  // }

  navigateToProfile(): void {
    console.log('Navigate to profile');
    this.closeUserMenu()
    this.router.navigate(['/profile'])
  }

  navigateToBookings(): void {
    console.log('Navigate to bookings');
    this.closeUserMenu()
    this.router.navigate(['/booking-history'])
  }

  navigateToSettings(): void {
    console.log('Navigate to settings');
    this.closeUserMenu()
    this.router.navigate(['/settings'])
  }

  OnLogout(): void {
    console.log('Logout initiated');
    this.closeUserMenu()
    this.closeMobileNav()

    try {
      this.authService.signOut()
      this.isLoggedIn = false
      this.hasToken = false
      this.navItems = [...this.defaultNavItems, this.registerNavItem]

      console.log('Logout successful, navigating to login');
      this.router.navigate(["/dashboard/login"], { replaceUrl: true })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  navigateAndClose(route: string): void {
    this.closeMobileNav()
    this.router.navigate([route])
  }

  isRouteActive(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route + "/")
  }

  getIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      users: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-2.121-1.312-3.93-3.204-4.653M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-2.121 1.312-3.93 3.204-4.653m0 0A5.002 5.002 0 0112 15.5c1.92 0 3.675 1.08 4.796 2.847M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      "user-plus": "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    }
    return icons[iconName] || ""
  }

  goToProfile(): void {
    console.log('Navigating to profile');
    this.closeUserMenu()
    this.router.navigate(['/userprofile'])
  }



  
}