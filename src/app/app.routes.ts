import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';

export const routes: Routes = [

    { path:'home', component: HomeComponent },
    { path:'cliente', component: ClienteComponent },

    { path:'usuario', component: UsuarioComponent }
];
