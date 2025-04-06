import { Injectable, inject } from '@angular/core';
import { Videojuego } from '../models/videojuego';
import { firstValueFrom } from 'rxjs';
import { collection, collectionData, deleteDoc, updateDoc, Firestore } from '@angular/fire/firestore';
import { addDoc, doc } from 'firebase/firestore';
import { DesarrolladorService } from './desarrolladores.service';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {
  private db: Firestore = inject(Firestore);
  private desarrolladoresService = inject(DesarrolladorService);

  getVideojuegos() {
    const videojuegosCollection = collection(this.db, 'videojuegos');
    return collectionData(videojuegosCollection, { idField: 'id' });
  }

  async getVideojuegosConDesarrollador(): Promise<Videojuego[]> {
    const videojuegos = await firstValueFrom(this.getVideojuegos()) as Videojuego[];
    const desarrolladores = await firstValueFrom(this.desarrolladoresService.getDesarrolladores());
    
    return videojuegos.map(v => ({
      ...v,
      desarrolladorNombre: desarrolladores.find(d => d.id === v.desarrolladorId)?.nombre || 'Desconocido'
    }));
  }

  async addVideojuegos(videojuego: Omit<Videojuego, 'id'>) {
    const videojuegosCollection = collection(this.db, 'videojuegos');
    const videojuegoData = {
      titulo: videojuego.titulo,
      genero: videojuego.genero,
      lanzamiento: videojuego.lanzamiento,
      precio: videojuego.precio,
      desarrolladorId: videojuego.desarrolladorId
    };
    await addDoc(videojuegosCollection, videojuegoData);
  }

  async updateVideojuegos(videojuego: Videojuego) {
    if (!videojuego.id) {
      console.error('Error: El videojuego no tiene un ID válido.');
      return;
    }
    
    const documentRef = doc(this.db, 'videojuegos', videojuego.id);
    await updateDoc(documentRef, {
      titulo: videojuego.titulo,
      genero: videojuego.genero,
      lanzamiento: videojuego.lanzamiento,
      precio: videojuego.precio,
      desarrolladorId: videojuego.desarrolladorId
    });
  }
  
  async deleteVideojuegos(id: string) {
    if (!id) {
      console.error('Error: No se puede eliminar un videojuego sin ID.');
      return;
    }
  
    const documentRef = doc(this.db, 'videojuegos', id);
    await deleteDoc(documentRef);
  }
}