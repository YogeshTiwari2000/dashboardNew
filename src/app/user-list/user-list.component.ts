import { Component, inject, Signal, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserTableComponent, IUser } from '../reuseable components/user-table/user-table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, UserTableComponent],
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  private http = inject(HttpClient);

  users = signal<IUser[]>([]);
  searchTerm = signal('');

  constructor() {
    this.users.set([
      { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
      { name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Inactive' },
      { name: 'Charlie Brown', email: 'charlie@example.com', role: 'Moderator', status: 'Active' },
      {

        name: "Aaa",
        email: "aaa@gmail.com",
        role: 'Admin', status: 'Active'
      },
      {

        name: "Adi",
        email: "ad@gmail.com",
        role: "Customer", status: "Inactive"
      },
      {

        name: "Adi",
        email: "ad@gmail.com",
        role: 'Admin', status: 'Active'
      },
      {
        name: "Ganesh",
        email: "chab@",
        role: 'Admin', status: 'Active'
      },
    ]);
  }

  onView(user: IUser) {
    alert(`View: ${user.name}`);
  }

  onEdit(user: IUser) {
    alert(`Edit: ${user.name}`);
  }

  onDelete(user: IUser) {
    const updated = this.users().filter(u => u !== user);
    this.users.set(updated);
  }
}
