import { Donacion } from './donacion.model';

export interface BancoDeAlimentos {
    
    id?: number | undefined;
    nombre: string;
    direccion: string;
    telefono?: string;
    email: string;
    ciudad: string;
    contrasenia: string;
    donaciones?: Donacion[];
    documentacionValidada?: boolean;
    // imagen: string; comentada a la espera de que se introduzca en base de datos
}