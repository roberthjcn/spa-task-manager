import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserResponse } from '../shared/interfaces/userResponse.interface';
import { IUserRequest } from '../shared/interfaces/userRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(private router: Router, private http: HttpClient) {

  }
  login(email: string): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`${this.apiUrl}/${email}`);
  }

  registerUser(data: IUserRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, data);
  }
}