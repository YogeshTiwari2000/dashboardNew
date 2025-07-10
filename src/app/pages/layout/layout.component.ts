import { ApiServiceService } from './../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, DashboardComponent, RouterLink, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isMenuOpen: boolean = false;
  isAnimatingIn: boolean = true;
  isSticky: boolean = false;
  currentTitle: string = '';
  loggedInUserName: string = '';
  openIndex: number | null = null;
  menuOpen = false;

  constructor(private apiService: ApiServiceService, private router: Router) {

  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  // Close the menu on click anywehre on screen
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedInside = (event.target as HTMLElement).closest('.relative');
    if (!clickedInside) {
      this.menuOpen = false;
    }
  }

  toggleDropdown(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }


  navLinks = [
    { path: '/dashboard', icon: 'fa-house', title: 'Dashboard' },
    { path: '/settings', icon: 'fa-cog', title: 'Settings' },
    { action: 'logout', icon: 'fa-right-from-bracket', title: 'Logout' }
  ];



  ngOnInit(): void {
    
    this.getUserFromLocalStorage();
  }

  private getUserFromLocalStorage(): void {

    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.loggedInUserName = parsedUser?.userName || 'Guest';
      } catch (e) {
        console.error('Error parsing user data:', e);
        this.loggedInUserName = 'Guest';
      }
    } else {
      this.loggedInUserName = 'Guest';
    }
  }

  onLinkClick(link: any): void {
    if (link.action === 'logout') {
      this.onLogout();
    }

    this.closeMenu();
  }


  MobileMenu() {
    this.isAnimatingIn = true; 
    this.isMenuOpen = true;    
  }

  closeMenu() {
    this.isAnimatingIn = false; 
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 300); 
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isSticky = scrollPosition > 0;
  }

  onLogout() {
    
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login');
  }
  clearCache(): void {
    
  }
}
