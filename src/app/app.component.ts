import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { VideojuegosComponent } from './pages/videojuegos/videojuegos.component';
import { DesarrolladorComponent } from './pages/desarrolladores/desarrolladores.component';

@Component({
  selector: 'app-root',
  standalone: true, ////
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'beatsgames';
}
