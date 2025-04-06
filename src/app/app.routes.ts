import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { VideojuegosComponent } from './pages/videojuegos/videojuegos.component';
import { DesarrolladorComponent } from './pages/desarrolladores/desarrolladores.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'home',
        component: HomeComponent,
        canActivate: [authGuard],
    },
    {
        path:'videojuegos',
        component:  VideojuegosComponent,
        canActivate: [authGuard],
    },
    {
        path:'desarrolladores',
        component: DesarrolladorComponent,
        canActivate: [authGuard],
    },
    {
        path: '**',
        redirectTo: ''
    }
];
