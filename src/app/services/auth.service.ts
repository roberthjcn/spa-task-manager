import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IUserResponse } from '../shared/interfaces/userResponse.interface';
import { IUserRequest } from '../shared/interfaces/userRequest.interface';
import { ICreateUserResponse } from '../shared/interfaces/createUserResponse.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene un usuario por su email.
   * @param email El email del usuario a buscar.
   * @returns Un observable con la respuesta del servidor.
   */

  getUserByEmail(email: string): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`${this.apiUrl}/${email}`)
      .pipe(
        catchError(error => {
          return throwError(() => new Error('No se pudo obtener el usuario'));
        })
      );
  }

  /**
  * Crea un nuevo usuario.
  * @param data Los datos del usuario a crear.
  * @returns Un observable con la respuesta del servidor.
  */
  createUser(data: IUserRequest): Observable<ICreateUserResponse> {
    return this.http.post<ICreateUserResponse>(this.apiUrl, data)
      .pipe(
        catchError(error => {
          return throwError(() => new Error('No se pudo registrar el usuario'));
        })
      );
  }
}