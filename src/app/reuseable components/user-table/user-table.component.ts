

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface IUser {
  id?: string; // Add optional ID field
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() users: IUser[] = [];
  @Input() searchTerm: string = '';

  constructor(private router: Router) { }

  @Output() view = new EventEmitter<IUser>();
  @Output() edit = new EventEmitter<IUser>();
  @Output() delete = new EventEmitter<IUser>();

  get filteredUsers(): IUser[] {
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(term) || 
      user.email.toLowerCase().includes(term)
    );
  }

  goToProfile(user: IUser) {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    this.router.navigate(['/profile']);
  }

  onEdit(user: IUser) {
    this.router.navigate(['/users/form'], {
      state: { user }
    });
  }
}