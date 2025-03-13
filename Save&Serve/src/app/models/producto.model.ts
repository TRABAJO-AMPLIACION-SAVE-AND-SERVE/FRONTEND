// export interface Producto {
//     id?: number;
//     nombre: string;
//     idProducto: string;
//     precio: string;
//     tipoProducto: 'SECO' | 'REFRIGERADO' | 'CONGELADO';
//     lineaProducto?: LineaProducto[];
//     alergenos?: Alergenos[];
//     tipoTransporte: TipoTransporte;
// }


//Cambios de leti

import { TipoTransporte } from './tipoTransporte.model';
import { TipoProducto } from './tipo-producto'
import { LineaProducto } from './lineaProdcuto.model';
import { Alergenos } from './alergenos.model';

export interface Producto {
    id?: number;
    nombre: string;
    idProducto: string;
    precio: number;
    tipoTransporte: TipoTransporte;
    tipoProducto: TipoProducto;
    lineaProducto?: LineaProducto[];
    alergenos?: Set<Alergenos>;
}