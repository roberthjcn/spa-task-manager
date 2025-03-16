import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DialogCreateUserComponent } from '../../components/dialog-create-user/dialog-create-user.component';
import { SnackbarService } from '../../services/snackbar.service';
import { firstValueFrom } from 'rxjs';
import { AppConstants } from '../../shared/constants/constants';
import { IUserResponse } from '../../shared/interfaces/userResponse.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatDialogModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule]
})
export class LoginComponent {
  email: string = '';
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onLogin(): Promise<void> {
    if (!this.isFormValid()) return;

    const { email } = this.loginForm.value;

    try {
      const response: IUserResponse = await this.attemptLogin(email);

      if (!response) {
        this.showLoginError();
        return;
      }

      this.handleLoginResponse(response, email);
    } catch (error) {
      this.handleLoginError();
    }
  }

  private isFormValid(): boolean {
    return this.loginForm.valid;
  }

  private async attemptLogin(email: string): Promise<IUserResponse> {
    return await firstValueFrom(this.authService.getUserByEmail(email));
  }

  private handleLoginResponse(response: IUserResponse, email: string): void {
    switch (response.status) {
      case AppConstants.STATUS_CODES.SUCCESS:
        this.handleLoginSuccess(response.user?.email);
        break;

      case AppConstants.STATUS_CODES.NOT_FOUND:
        this.handleUserNotFound(email);
        break;

      default:
        this.showUnknownError();
        break;
    }
  }

  private handleLoginSuccess(userEmail: string | undefined): void {
    this.snackbarService.showMessage(AppConstants.MESSAGES.LOGIN_SUCCESS);
    this.storeUserInLocalStorage(userEmail);
    this.navigateToTasks();
  }

  private handleUserNotFound(email: string): void {
    this.snackbarService.showMessage(AppConstants.MESSAGES.USER_NOT_FOUND);
    this.openCreateUserDialog(email);
  }

  private showLoginError(): void {
    this.snackbarService.showMessage(AppConstants.MESSAGES.LOGIN_ERROR);
  }

  private showUnknownError(): void {
    this.snackbarService.showMessage(AppConstants.MESSAGES.UNKNOWN_ERROR);
  }

  private handleLoginError(): void {
    this.snackbarService.showMessage(AppConstants.MESSAGES.LOGIN_RETRY);
  }

  private storeUserInLocalStorage(email: string | undefined): void {
    if (email) {
      localStorage.setItem(AppConstants.STORAGE_KEYS.USER, email);
    }
  }

  private navigateToTasks(): void {
    this.router.navigate([AppConstants.ROUTES.TASKS]);
  }

  private openCreateUserDialog(email: string): void {
    this.dialog.open(DialogCreateUserComponent, { data: { email } });
  }
}

