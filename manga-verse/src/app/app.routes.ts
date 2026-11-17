import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { Catalogo } from './pages/catalogo/catalogo';
import { Detalhes } from './pages/detalhes/detalhes';
import { Carrinho } from './pages/carrinho/carrinho';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Pedidos } from './pages/pedidos/pedidos';

import { Admin } from './pages/admin/admin';
import { AdicionarManga } from './pages/admin/adicionar-manga/adicionar-manga';

export const routes: Routes = [

  { path: '', component: Inicio },

  { path: 'catalogo', component: Catalogo },

  { path: 'detalhes/:id', component: Detalhes },

  { path: 'carrinho', component: Carrinho },

  { path: 'login', component: Login },

  { path: 'cadastro', component: Cadastro },

  { path: 'pedidos', component: Pedidos },

  { path: 'admin', component: Admin },

  {
    path: 'admin/adicionar-manga',
    component: AdicionarManga
  },

  { path: '**', redirectTo: '' }

];