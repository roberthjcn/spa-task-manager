import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITaskResponse } from '../shared/interfaces/taskResponse.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  getTasks(emailUser: string): Observable<ITaskResponse[]> {
    return this.http.get<ITaskResponse[]>(`${this.apiUrl}?email=${encodeURIComponent(emailUser)}`)
      .pipe(
        catchError((error: unknown) => {
          console.error('Error en getTasks:', error);
          const message = error instanceof Error ? error.message : 'No se pudieron obtener las tareas';
          return throwError(() => new Error(message));
        })
      );
  }

  addTask(task: ITaskResponse): Observable<ITaskResponse> {
    return this.http.post<ITaskResponse>(this.apiUrl, task)
      .pipe(
        catchError((error: unknown) => {
          console.error('Error en addTask:', error);
          const message = error instanceof Error ? error.message : 'No se pudo agregar la tarea';
          return throwError(() => new Error(message));
        })
      );
  }

  deleteTask(taskId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${taskId}`)
      .pipe(
        catchError((error: unknown) => {
          console.error('Error en deleteTask:', error);
          const message = error instanceof Error ? error.message : 'No se pudo eliminar la tarea';
          return throwError(() => new Error(message));
        })
      );
  }

  updateTask(taskId: string, updates: Partial<ITaskResponse>): Observable<ITaskResponse> {
    return this.http.put<ITaskResponse>(`${this.apiUrl}/${taskId}`, updates)
      .pipe(
        catchError((error: unknown) => {
          console.error('Error en updateTask:', error);
          const message = error instanceof Error ? error.message : 'No se pudieron actualizar las tareas';
          return throwError(() => new Error(message));
        })
      );
  }
}
