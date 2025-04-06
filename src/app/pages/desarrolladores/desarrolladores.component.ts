import { Component, OnInit } from '@angular/core';
import { Desarrollador } from '../../models/desarrolladores';
import { DesarrolladorService } from '../../services/desarrolladores.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-desarrollador',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuComponent], // Removido MenuComponent ya que no se usa en el template
  templateUrl: './desarrolladores.component.html',
  styleUrls: ['./desarrolladores.component.css']
})
export class DesarrolladorComponent implements OnInit {
  desarrolladores: Desarrollador[] = [];
  desarrollador: Desarrollador = {
    nombre: '',
    pais: '',
    anioFundacion: new Date().getFullYear()
  };
  cargando = false;
  currentYear = new Date().getFullYear(); // Añadido para usar en el template

  constructor(private desarrolladorService: DesarrolladorService) {}

  ngOnInit(): void {
    this.getDesarrolladores();
  }

  async getDesarrolladores(): Promise<void> {
    this.cargando = true;
    try {
      const data = await firstValueFrom(this.desarrolladorService.getDesarrolladores());
      this.desarrolladores = data as Desarrollador[];
    } catch (error) {
      console.error('Error al obtener desarrolladores:', error);
    } finally {
      this.cargando = false;
    }
  }

  async insertarDesarrollador() {
    try {
      await this.desarrolladorService.agregarDesarrollador(this.desarrollador);
      this.resetForm();
      await this.getDesarrolladores();
    } catch (error) {
      console.error('Error al insertar:', error);
    }
  }

  selectDesarrollador(desarrollador: Desarrollador) {
    this.desarrollador = { ...desarrollador };
  }

  async updateDesarrollador() {
    if (!this.desarrollador.id) return;
    
    try {
      await this.desarrolladorService.modificarDesarrollador(this.desarrollador);
      this.resetForm();
      await this.getDesarrolladores();
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  }

  async deleteDesarrollador(id: string) { // Actualizado para aceptar parámetro
    if (!id) return;
    
    try {
      await this.desarrolladorService.eliminarDesarrollador(id);
      this.resetForm();
      await this.getDesarrolladores();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  }

  cancelarEdicion() { // Añadido método faltante
    this.resetForm();
  }

  private resetForm() {
    this.desarrollador = {
      nombre: '',
      pais: '',
      anioFundacion: this.currentYear
    };
  }
}