import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    // Verifica si el usuario está "autenticado" (por ejemplo, si existe un valor en el localStorage)
    const isAuthenticated = !!localStorage.getItem('user');

    if (isAuthenticated) {
      return true; // Permite el acceso a la ruta
    } else {
      this.router.navigate(['/']); // Redirige a la página principal
      return false; // Bloquea el acceso a la ruta
    }
  }
}