// import { NgModule } from '@angular/core';
// import { IndexComponent } from './pages/index/index.component';
// import { RouterModule, Routes } from '@angular/router';
// import path from 'path';


// const routes: Routes = [
//   { path: '', component: IndexComponent },
//   { path: 'articles', loadComponent: () => import('./pages/articles/articles.component').then(m => m.ArticlesComponent) },
//   { path: 'suscription', loadComponent: () => import('./pages/subscription/subscription.component').then(m => m.SubscriptionComponent) },
//   { path: 'empresas-donacion', loadComponent: () => import('./pages/empresas/empresas.component').then(m => m.EmpresasComponent) },
//   { path: 'zonaAdmin', loadComponent: () => import('./pages/zona-admin/zona-admin.component').then(m => m.ZonaAdminComponent) },
//   { path: 'gestionArticulos', loadComponent: () => import('./pages/gestion-articulos/gestion-articulos.component').then(m => m.GestionArticulosComponent) },
//   { path: 'pasarelaPago', loadComponent: () => import('./pages/pasarela-pago/pasarela-pago.component').then(m => m.PasarelaPagoComponent) },
//   { path: 'hazteVoluntario', loadComponent: () => import('./pages/haztevoluntario/haztevoluntario.component').then(m => m.HaztevoluntarioComponent) },
//   { path: 'articulo-detalle/:idArticulo', loadComponent: () => import('./pages/articulo-detalle/articulo-detalle.component').then(m => m.ArticuloDetalleComponent) },
//   { path: 'informacionEmpresas', loadComponent: () => import('./pages/informacionempresa/informacionempresa.component').then(m => m.InformacionempresaComponent) },
//   { path: 'gestionBeneficiarios', loadComponent: () => import('./pages/gestion-beneficiarios/gestion-beneficiarios.component').then(m => m.GestionBeneficiariosComponent) },

//   { path: '**', redirectTo: '', pathMatch: 'full' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule { }


import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { 
    path: 'articles', 
    loadComponent: () => import('./pages/articles/articles.component').then(m => m.ArticlesComponent) 
  },
  { 
    path: 'suscription', 
    loadComponent: () => import('./pages/subscription/subscription.component').then(m => m.SubscriptionComponent) 
  },
  { 
    path: 'empresas-donacion', 
    loadComponent: () => import('./pages/empresas/empresas.component').then(m => m.EmpresasComponent) 
  },
  { 
    path: 'zonaAdmin', 
    loadComponent: () => import('./pages/zona-admin/zona-admin.component').then(m => m.ZonaAdminComponent) 
  },
  { 
    path: 'gestionArticulos', 
    loadComponent: () => import('./pages/gestion-articulos/gestion-articulos.component').then(m => m.GestionArticulosComponent) 
  },
  { 
    path: 'pasarelaPago', 
    loadComponent: () => import('./pages/pasarela-pago/pasarela-pago.component').then(m => m.PasarelaPagoComponent) 
  },
  { 
    path: 'hazteVoluntario', 
    loadComponent: () => import('./pages/haztevoluntario/haztevoluntario.component').then(m => m.HaztevoluntarioComponent) 
  },
  { 
    path: 'articulo-detalle/:idArticulo', 
    loadComponent: () => import('./pages/articulo-detalle/articulo-detalle.component').then(m => m.ArticuloDetalleComponent) 
  },
  { 
    path: 'informacionEmpresas', 
    loadComponent: () => import('./pages/informacionempresa/informacionempresa.component').then(m => m.InformacionempresaComponent) 
  },
  { 
    path: 'gestionBeneficiarios', 
    loadComponent: () => import('./pages/gestion-beneficiarios/gestion-beneficiarios.component').then(m => m.GestionBeneficiariosComponent) 
  },
  { 
    path: 'banco-alimentos', 
    loadComponent: () => import('./pages/banco-alimentos/banco-alimentos.component').then(m => m.BancoAlimentosComponent) 
  },
  { 
    path: 'gestionEmpresas', 
    loadComponent: () => import('./pages/gestion-empresas/gestion-empresas.component').then(m => m.GestionEmpresasComponent) 
  },
//New
  {
    path: 'gestionDonaciones', 
    loadComponent: () => import('./components/pages/gestion-donaciones/gestion-donaciones.component').then(m => m.GestionDonacionesComponent) 
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }







  


];

// Eliminar el decorador @NgModule y la exportación de la clase