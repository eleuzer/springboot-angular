import { Routes } from '@angular/router';

import { PessoaListComponent } from 'app/pessoa-list/pessoa-list.component';
import { PessoaEditComponent } from 'app/pessoa-edit/pessoa-edit.component';
import { ProdutoListComponent } from 'app/produto-list/produto-list.component';
import { ProdutoEditComponent } from 'app/produto-edit/produto-edit.component';
import { PedidoListComponent } from 'app/pedido-list/pedido-list.component';
import { PedidoEditComponent } from 'app/pedido-edit/pedido-edit.component';

export const AdminLayoutRoutes: Routes = [
   
    { path: 'pessoa-list',   component: PessoaListComponent },
    { path: 'pessoa-edit/:id',   component: PessoaEditComponent },
    { path: 'produto-list',   component: ProdutoListComponent },
    { path: 'produto-edit/:id',   component: ProdutoEditComponent },
    { path: 'pedido-list',   component: PedidoListComponent },
    { path: 'pedido-edit/:id',   component: PedidoEditComponent },
];
