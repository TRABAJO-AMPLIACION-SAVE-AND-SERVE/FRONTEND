export interface BancoDeAlimentos {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  ciudad: string;
  contrasenia: string;
  donaciones?: any[]; // Cambiado temporalmente a any[] hasta que implementes la interfaz Donacion
  // imagen: string; comentada a la espera de que se introduzca en base de datos
}