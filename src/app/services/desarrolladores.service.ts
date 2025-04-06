import { Injectable, inject } from '@angular/core';
import { Desarrollador } from '../models/desarrolladores';
import { firstValueFrom, map } from 'rxjs';
import { 
  collection, 
  collectionData, 
  deleteDoc, 
  Firestore, 
  updateDoc, 
  doc, 
  addDoc 
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DesarrolladorService {
  private firestore: Firestore = inject(Firestore);
  private readonly collectionName = 'desarrolladores';

  getDesarrolladores() {
    const desarrolladoresCollection = collection(this.firestore, this.collectionName);
    return collectionData(desarrolladoresCollection, { idField: 'id' }).pipe(
      map(data => data as Desarrollador[]) // Asegura el tipo correcto
    );
  }

  async agregarDesarrollador(desarrollador: Omit<Desarrollador, 'id'>) {
    const desarrolladoresCollection = collection(this.firestore, this.collectionName);
    const desarrolladorData = {
      ...desarrollador,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    const docRef = await addDoc(desarrolladoresCollection, desarrolladorData);
    return { id: docRef.id, ...desarrolladorData } as Desarrollador;
  }

  async modificarDesarrollador(desarrollador: Desarrollador) {
    if (!desarrollador.id) {
      throw new Error('Se requiere ID para modificar');
    }
    const documentRef = doc(this.firestore, this.collectionName, desarrollador.id);
    await updateDoc(documentRef, {
      nombre: desarrollador.nombre,
      pais: desarrollador.pais,
      anioFundacion: desarrollador.anioFundacion,
      fechaActualizacion: new Date()
    });
  }

  async eliminarDesarrollador(id: string) {
    const documentRef = doc(this.firestore, this.collectionName, id);
    await deleteDoc(documentRef);
  }
}