import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  showMessage(
    message: string,
    action: string = 'Cerrar',
    duration: number = 3000,
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition = 'end'
  ) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition,
      horizontalPosition
    });
  }
}
