// export interface Alergenos {
//     id?: number;
//     nombre: string;
//    productos?: Producto[];
// }

//Cambios de leti
import { Producto } from './producto.model';

export interface Alergenos {
    id?: number;
    nombre: string;
    imagen: string;
    productos?: Set<Producto>;
}