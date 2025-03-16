import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChip } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskItemComponent } from '../../components/task-item/task-item.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskService } from '../../services/task.service';
import { ITaskResponse } from '../../shared/interfaces/taskResponse.interface';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { AppConstants } from '../../shared/constants/constants';
import { firstValueFrom } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TaskItemComponent,
    MatMenuModule,
    MatChip
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private dialog = inject(MatDialog);
  tasks: ITaskResponse[] = [];
  email: string = "";

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.email = this.getUserEmail();
    this.loadTasks();
  }

  private getUserEmail(): string {
    return localStorage.getItem(AppConstants.STORAGE_KEYS.USER) || '';
  }

  private async loadTasks(): Promise<void> {
    this.tasks = await this.fetchTasks();
    this.tasks = this.sortTasksByCreationDate(this.tasks);
  }

  private sortTasksByCreationDate(tasks: ITaskResponse[]): ITaskResponse[] {
    return tasks.sort((a, b) => {
      const dateA = this.convertTimestampToDate(a.creationDate);
      const dateB = this.convertTimestampToDate(b.creationDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private convertTimestampToDate(timestamp: { _seconds: number; _nanoseconds: number }): Date {
    const firebaseTimestamp = new Timestamp(timestamp._seconds, timestamp._nanoseconds);
    return firebaseTimestamp.toDate();
  }


  private async fetchTasks(): Promise<ITaskResponse[]> {
    const response = await firstValueFrom(this.taskService.getTasks(this.email));
    return response || [];
  }

  openTaskModal(task: ITaskResponse | null = null): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.handleTaskModalResult(result, task);
      }
    });
  }

  private handleTaskModalResult(result: any, task: ITaskResponse | null): void {
    if (result.delete) {
      this.deleteTask(task!.id);
    } else if (task) {
      this.updateTask(result, task.id);
    } else {
      this.addTask(result);
    }
  }

  private async addTask(task: ITaskResponse): Promise<void> {
    task.emailUser = this.email;
    await firstValueFrom(this.taskService.addTask(task));
    this.showMessage(AppConstants.MESSAGES.TASK_CREATED);
    this.loadTasks();
  }

  private async updateTask(task: ITaskResponse, taskId: string): Promise<void> {
    await firstValueFrom(this.taskService.updateTask(taskId, task));
    this.showMessage(AppConstants.MESSAGES.TASK_UPDATED);
    this.loadTasks();
  }

  async deleteTask(taskId: string): Promise<void> {
    await firstValueFrom(this.taskService.deleteTask(taskId));
    this.showMessage(AppConstants.MESSAGES.TASK_DELETION);
    this.loadTasks();
  }

  updateTaskStatus(update: { id: string; status: boolean }) {
    this.taskService.updateTask(update.id, update).subscribe({
      next: () => {
        this.snackbarService.showMessage(update.status ? AppConstants.MESSAGES.TASK_COMPLETE : AppConstants.MESSAGES.TASK_PENDING);
        this.loadTasks();
      },
      error: (err) => {
        console.error('Error updating task status:', err);
        this.snackbarService.showMessage('Error al actualizar la tarea');
      },
    });
  }

  logout(): void {
    localStorage.removeItem(AppConstants.STORAGE_KEYS.USER);
    this.router.navigate([AppConstants.ROUTES.LOGIN]);
  }

  private showMessage(message: string): void {
    this.snackbarService.showMessage(message);
  }

}