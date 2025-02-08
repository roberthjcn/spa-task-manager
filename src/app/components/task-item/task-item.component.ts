import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ITaskResponse } from '../../shared/interfaces/taskResponse.interface';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: ITaskResponse;
  @Output() taskDeleted = new EventEmitter<string>();
  @Output() taskUpdated = new EventEmitter<{ id: string; status: boolean; description: string, title: string }>();
  @Output() taskEdited = new EventEmitter<string>();


  deleteTask() {
    this.taskDeleted.emit(this.task.id);
  }

  toggleTaskStatus(event: any) {
    this.taskUpdated.emit({ id: this.task.id, status: event.checked, description: event.description, title: event.title });
  }

  editTask() {
    this.taskEdited.emit(this.task.id);
  }

  getCreationDate(task: ITaskResponse): Date | null {
    if (task?.creationDate?._seconds) {
      const milliseconds = task.creationDate._seconds * 1000 + task.creationDate._nanoseconds / 1000000;
      return new Date(milliseconds);
    }
    return null;
  }
}