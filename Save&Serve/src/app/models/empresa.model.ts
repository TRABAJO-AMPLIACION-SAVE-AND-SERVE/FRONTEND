import { Donacion } from './donacion.model';

export enum Suscripcion {
    BASICA = 'BASICA',
    ESTANDAR = 'ESTANDAR',
    PREMIUM = 'PREMIUM'
}

export interface Empresa {
    id?: number | undefined;
    nombre: string;
    email: string;
    direccion: string;
    telefono?: string;
    cif: string;
    contrasenia: string;
    tipo?: string;
    ciudad: string;
    suscripcion?: Suscripcion;
    donaciones?: Donacion[];
    documentacionValidada?: boolean;
}


