

import { Empresa } from './empresa.model';
import { LineaProducto } from './lineaProdcuto.model';
import { BancoDeAlimentos } from './bancoAlimentos.model';
import { Transporte } from './transporte.model';

export enum EstadoEnvio {
    ENTREGADO = 'ENTREGADO',
    ENVIADO = 'ENVIADO',
    PENDIENTE = 'PENDIENTE',
    DENEGADO = 'DENEGADO' //NEW: Estado para donaciones denegadas

}

export interface Donacion {
    idDonacion?: number;
    totalDonacion?: number;
    fechaEntrega: Date;
    estadoEnvio: EstadoEnvio;
    donacionesRelacionadas?: Donacion[];
    donacionPrincipal?: Donacion;
    empresa: Empresa;
    lineasProducto?: LineaProducto[];
    bancoDeAlimentos: BancoDeAlimentos;
    transporte: Transporte;
}