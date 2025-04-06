import { Component, OnInit } from '@angular/core';
import { VideojuegosService } from '../../services/videojuegos.service';
import { DesarrolladorService } from '../../services/desarrolladores.service';
import { CommonModule } from '@angular/common'; // Añadir esto
import { firstValueFrom } from 'rxjs';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-home',
  standalone: true, // Si usas standalone components
  imports: [CommonModule, MenuComponent], // Añadir esto
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalJuegos: number = 0;
  totalDesarrolladores: number = 0;
  currentYear: number = new Date().getFullYear();
  ultimosJuegos: any[] = [];

  constructor(
    private videojuegosService: VideojuegosService,
    private desarrolladorService: DesarrolladorService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  async cargarDatos() {
    // Obtener conteo de juegos
    const juegos = await firstValueFrom(this.videojuegosService.getVideojuegos());
    this.totalJuegos = juegos?.length || 0;

    // Obtener conteo de desarrolladores
    const desarrolladores = await firstValueFrom(this.desarrolladorService.getDesarrolladores());
    this.totalDesarrolladores = desarrolladores?.length || 0;

    // Obtener últimos 4 juegos añadidos
    this.ultimosJuegos = juegos?.slice(-4).reverse() || [];
  }
}