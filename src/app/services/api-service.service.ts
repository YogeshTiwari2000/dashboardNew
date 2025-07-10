

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  http = inject(HttpClient);

  getAllUsers() {
    this.http.get('https://projectapi.gerasim.in/api/OnlineLearning/GetAllUsers').subscribe(response => {
      console.log(response);
    });
  }

}



