
import { Component, inject, signal, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isSubmitting = signal(false);
  isEditMode = signal(false);
  currentUserId: string | null = null;

  roles = ['Admin', 'Editor', 'Viewer'];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    role: new FormControl('Admin'),
    status: new FormControl('Active'),
  });

  ngOnInit() {
    // Check if we're in edit mode (user data passed via state)
    const state = history.state;
    const stateUser = state['user'];
    console.log("stateUser", stateUser);
    
    if (stateUser) {
      this.populateForm(stateUser);
      this.isEditMode.set(true);
    }
  }

  populateForm(user: any) {
    this.form.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      status: user.status
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    setTimeout(() => {
      alert(this.isEditMode() ? 'User updated successfully!' : 'User created successfully!');
      this.isSubmitting.set(false);
      this.router.navigate(['/users']);
    }, 1000);
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}