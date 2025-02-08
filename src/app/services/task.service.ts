import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITaskResponse } from '../shared/interfaces/taskResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {

  }

  getTasks(emailUser: string): Observable<ITaskResponse[]> {
    return this.http.get<ITaskResponse[]>(`${this.apiUrl}?email=${emailUser}`);
  }

  addTask(task: any): Observable<ITaskResponse> {
    return this.http.post<ITaskResponse>(`${this.apiUrl}/`, task);
  }

  deleteTask(taskId: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${taskId}`);
  }

  updateTask(taskId: string, updates: Partial<any>): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${taskId}`, updates);
  }
}