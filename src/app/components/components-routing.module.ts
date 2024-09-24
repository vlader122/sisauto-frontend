import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m=>m.ClientesModule)},
    { path: 'servicios', loadChildren: () => import('./servicios/servicios.module').then(m=>m.ServiciosModule)},
  ])
  ]
})
export class ComponentsRoutingModule { }
