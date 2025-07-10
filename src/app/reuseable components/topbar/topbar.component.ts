import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  menuOpen = false;
  loggedInUserName = 'Guest';

  constructor(private router: Router) {
    this.getUserFromLocalStorage();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedInside = (event.target as HTMLElement).closest('.relative');
    if (!clickedInside) {
      this.menuOpen = false;
    }
  }

  onLogout() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login');
  }

  private getUserFromLocalStorage() {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.loggedInUserName = parsedUser?.userName || 'Guest';
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }
}
