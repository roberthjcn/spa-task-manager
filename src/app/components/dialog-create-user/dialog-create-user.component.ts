import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { IUserRequest } from '../../shared/interfaces/userRequest.interface';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AppConstants } from '../../shared/constants/constants';
import { ICreateUserResponse } from '../../shared/interfaces/createUserResponse.interface';

@Component({
  selector: 'app-dialog-create-user',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialog-create-user.component.html',
  styleUrl: './dialog-create-user.component.css'
})
export class DialogCreateUserComponent {
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<DialogCreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  async createUser(): Promise<void> {
    try {
      const userData = this.prepareUserData();
      const response = await this.registerUser(userData);

      if (response) {
        this.handleSuccess(response.email);
      } else {
        this.handleError();
      }
    } catch (error) {
      this.handleError();
    } finally {
      this.closeDialog();
    }
  }

  private prepareUserData(): IUserRequest {
    return {
      email: this.data.email,
    };
  }

  private async registerUser(userData: IUserRequest): Promise<ICreateUserResponse> {
    return await firstValueFrom(this.authService.createUser(userData));
  }

  private handleSuccess(email: string): void {
    this.snackbarService.showMessage(AppConstants.MESSAGES.USER_CREATED);
    this.storeUserInLocalStorage(email);
    this.navigateToTasks();
  }

  private handleError(): void {
    this.snackbarService.showMessage(AppConstants.MESSAGES.USER_CREATION_ERROR); 
  }

  private storeUserInLocalStorage(email: string): void {
    localStorage.setItem(AppConstants.STORAGE_KEYS.USER, email); 
  }

  private navigateToTasks(): void {
    this.router.navigate([AppConstants.ROUTES.TASKS]); 
  }

  private closeDialog(): void {
    this.dialogRef.close();
  }
}
