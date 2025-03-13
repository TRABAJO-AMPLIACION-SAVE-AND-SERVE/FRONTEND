// export interface Transporte {
//     id?: number;
//     nombreTransporte: string;
//     tipoTransporte: TipoTransporte[];
// }

//cambios leti

import { TipoTransporte } from './tipoTransporte.model';

export interface Transporte {
    id?: number;
    nombreTransporte: string;
    tipoTransporte: Set<TipoTransporte>;
}