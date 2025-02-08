import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ITaskResponse } from '../../shared/interfaces/taskResponse.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  private dialogRef = inject(MatDialogRef<TaskFormComponent>);
  private fb = inject(FormBuilder);

  taskForm: FormGroup = this.fb.group({
    title: [''],
    description: [''],
    status: [false]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: ITaskResponse | null) {
    if (data) {
      this.taskForm.patchValue(data);
    }
  }

  close() {
    this.dialogRef.close();
  }

  saveTask() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  deleteTask() {
    this.dialogRef.close({ delete: true });
  }
}