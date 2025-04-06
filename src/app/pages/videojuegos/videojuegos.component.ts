import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideojuegosService } from '../../services/videojuegos.service';
import { DesarrolladorService } from '../../services/desarrolladores.service';
import { Videojuego } from '../../models/videojuego';
import { Desarrollador } from '../../models/desarrolladores';
import { MenuComponent } from "../menu/menu.component";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-videojuegos',
  standalone: true,
  templateUrl: './videojuegos.component.html',
  styleUrls: ['./videojuegos.component.css'],
  imports: [CommonModule, FormsModule, MenuComponent]
})
export class VideojuegosComponent implements OnInit {
  currentYear = new Date().getFullYear();
  videojuegos: Videojuego[] = [];
  desarrolladores: Desarrollador[] = [];
  filtroDesarrollador: string = '';
  
  nuevoVideojuego: Omit<Videojuego, 'id' | 'desarrolladorNombre'> = {
    titulo: '',
    genero: '',
    lanzamiento: this.currentYear,
    precio: 0,
    desarrolladorId: ''
  };
  
  editando = false;
  videojuegoEditandoId: string | null = null;

  constructor(
    private videojuegosService: VideojuegosService,
    private desarrolladorService: DesarrolladorService
  ) { }

  async ngOnInit() {
    await this.cargarDesarrolladores();
    await this.cargarVideojuegos();
  }

  async cargarDesarrolladores() {
    this.desarrolladores = await firstValueFrom(this.desarrolladorService.getDesarrolladores());
  }

  async cargarVideojuegos() {
    try {
      this.videojuegos = await this.videojuegosService.getVideojuegosConDesarrollador();
    } catch (error) {
      console.error('Error al cargar videojuegos:', error);
    }
  }

  async filtrarPorDesarrollador(devId: string) {
    if (!devId) {
      await this.cargarVideojuegos();
      return;
    }
    
    const todos = await this.videojuegosService.getVideojuegosConDesarrollador();
    this.videojuegos = todos.filter(v => v.desarrolladorId === devId);
  }

  agregarVideojuego() {
    this.videojuegosService.addVideojuegos(this.nuevoVideojuego)
      .then(() => {
        this.cargarVideojuegos();
        this.resetFormulario();
      })
      .catch(error => console.error('Error al agregar videojuego:', error));
  }

  editarVideojuego(videojuego: Videojuego) {
    this.editando = true;
    this.videojuegoEditandoId = videojuego.id || null;
    this.nuevoVideojuego = { 
      titulo: videojuego.titulo,
      genero: videojuego.genero,
      lanzamiento: videojuego.lanzamiento,
      precio: videojuego.precio,
      desarrolladorId: videojuego.desarrolladorId
    };
  }

  actualizarVideojuego() {
    if (!this.videojuegoEditandoId) return;

    const videojuegoActualizado: Videojuego = {
      id: this.videojuegoEditandoId,
      ...this.nuevoVideojuego,
      desarrolladorNombre: ''
    };

    this.videojuegosService.updateVideojuegos(videojuegoActualizado)
      .then(() => {
        this.cargarVideojuegos();
        this.cancelarEdicion();
      })
      .catch(error => console.error('Error al actualizar videojuego:', error));
  }

  eliminarVideojuego(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este videojuego?')) {
      this.videojuegosService.deleteVideojuegos(id)
        .then(() => this.cargarVideojuegos())
        .catch(error => console.error('Error al eliminar videojuego:', error));
    }
  }

  cancelarEdicion() {
    this.editando = false;
    this.videojuegoEditandoId = null;
    this.resetFormulario();
  }

  private resetFormulario() {
    this.nuevoVideojuego = {
      titulo: '',
      genero: '',
      lanzamiento: this.currentYear,
      precio: 0,
      desarrolladorId: ''
    };
    this.filtroDesarrollador = '';
  }
}