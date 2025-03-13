// export interface LineaProducto {
//     id?: number;
//     donacion: Donacion;
//     producto: Producto;
//     cantidad: number;
//     precioUnitario: number;
//     subtotal: number;
// }

//Cambios realizados por leti

import { Producto } from './producto.model';
import { Donacion } from './donacion.model';

export interface LineaProducto {
    id?: number;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
    producto: Producto;
    donacion: Donacion;
}