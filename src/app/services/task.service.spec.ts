import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { ITaskResponse } from '../shared/interfaces/taskResponse.interface';
import { environment } from '../../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/tasks`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasks', () => {
    it('should fetch tasks for a given user email', () => {
      const emailUser = 'test@example.com';
      const mockTasks: ITaskResponse[] = [{ id: '1', title: 'Task 1', 
        status: false, description: 'Task 1 description', creationDate: {_nanoseconds: 121212, _seconds: 948484}, 
        emailUser: emailUser}];

      service.getTasks(emailUser).subscribe(tasks => {
        expect(tasks).toEqual(mockTasks);
      });

      const req = httpMock.expectOne(`${apiUrl}?email=${encodeURIComponent(emailUser)}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });

    it('should handle errors in getTasks', () => {
      const emailUser = 'test@example.com';

      service.getTasks(emailUser).subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('No se pudieron obtener las tareas');
        }
      });

      const req = httpMock.expectOne(`${apiUrl}?email=${encodeURIComponent(emailUser)}`);
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('addTask', () => {
    it('should add a new task', () => {
      const newTask: ITaskResponse = {
        id: '1', title: 'Task 1',
        status: false, description: 'Task 1 description', creationDate: { _nanoseconds: 121212, _seconds: 948484 },
        emailUser: 'test@example.com'
      };

      service.addTask(newTask).subscribe(task => {
        expect(task).toEqual(newTask);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(newTask);
    });

    it('should handle errors in addTask', () => {
      const newTask: ITaskResponse = {
        id: '1', title: 'Task 1',
        status: false, description: 'Task 1 description', creationDate: { _nanoseconds: 121212, _seconds: 948484 },
        emailUser: 'test@example.com'
      };

      service.addTask(newTask).subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('No se pudo agregar la tarea');
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by ID', () => {
      const taskId = '3';
      const mockResponse = { message: 'Task deleted' };

      service.deleteTask(taskId).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/${taskId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });

    it('should handle errors in deleteTask', () => {
      const taskId = '3';

      service.deleteTask(taskId).subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('No se pudo eliminar la tarea');
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/${taskId}`);
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('updateTask', () => {
    it('should update a task by ID', () => {
      const taskId = '4';
      const updates: Partial<ITaskResponse> = {
        id: '1', title: 'Task 1',
        status: false, description: 'Task 1 description', creationDate: { _nanoseconds: 121212, _seconds: 948484 },
        emailUser: 'test@example.com'
      };
      const mockUpdatedTask: ITaskResponse = {
        id: '1', title: 'Task 1',
        status: false, description: 'Task 1 description', creationDate: { _nanoseconds: 121212, _seconds: 948484 },
        emailUser: 'test@example.com'
      };

      service.updateTask(taskId, updates).subscribe(task => {
        expect(task).toEqual(mockUpdatedTask);
      });

      const req = httpMock.expectOne(`${apiUrl}/${taskId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockUpdatedTask);
    });

    it('should handle errors in updateTask', () => {
      const taskId = '4';
      const updates: Partial<ITaskResponse> = {
        id: '1', title: 'Task 1',
        status: false, description: 'Task 1 description', creationDate: { _nanoseconds: 121212, _seconds: 948484 },
        emailUser: 'test@example.com'
      };

      service.updateTask(taskId, updates).subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('No se pudo actualizar la tarea');
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/${taskId}`);
      req.error(new ProgressEvent('Network error'));
    });
  });

});