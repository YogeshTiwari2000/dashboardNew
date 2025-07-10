

import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserListComponent as UserListComponent_1 } from '../../user-list/user-list.component';
import { TopbarComponent } from '../../reuseable components/topbar/topbar.component'
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UserListComponent_1, TopbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  title: string = "Latest Analytics";
  userInfo = [];
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private apiService: ApiServiceService,
  ) { }

  ngOnInit(): void {
    console.log("Dashboard component initialized");
  }

}