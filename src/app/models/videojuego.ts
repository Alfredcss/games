export interface Videojuego {
  id?: string;
  titulo: string;
  genero: string;
  lanzamiento: number;
  precio: number;
  desarrolladorId: string;
  desarrolladorNombre?: string;
  
}