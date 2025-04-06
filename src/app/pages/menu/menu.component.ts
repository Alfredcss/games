import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
 //metodo para cerrar sesion
 authService:AuthService = inject(AuthService);
 router: Router = inject(Router);

 salir() {
   this.authService.logout().subscribe({
     next: () => {
       this.router.navigateByUrl('');
     },
     error: (error) => {
       console.error('Error: ', error);
     },
   }); // <- Cerrando el método subscribe
 }
}
