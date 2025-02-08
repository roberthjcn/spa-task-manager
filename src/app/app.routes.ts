import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'tasks',
        loadComponent: () => import('./pages/tasks/tasks.component').then(m => m.TasksComponent),
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' }
];