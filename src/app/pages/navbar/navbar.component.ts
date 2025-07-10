
import { Component, HostListener } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] 
})
export class NavbarComponent {
  isSticky = false;

  constructor(private router: Router) { }

  navLinks = [
    { path: '/dashboard', icon: 'fa-house', title: 'Dashboard' },
    { path: '/users/form', icon: 'fa-user', title: 'Add User' },
    { action: 'logout', icon: 'fa-right-from-bracket', title: 'Logout' }
  ];

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isSticky = scrollPosition > 50;
  }

  onLogout(): void {
    
    this.router.navigateByUrl('/login');
  }
}
