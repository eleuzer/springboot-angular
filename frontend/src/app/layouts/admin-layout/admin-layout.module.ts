import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { PessoaListComponent } from 'app/pessoa-list/pessoa-list.component';
import { PessoaEditComponent } from 'app/pessoa-edit/pessoa-edit.component';
import { ProdutoListComponent } from 'app/produto-list/produto-list.component';
import { ProdutoEditComponent } from 'app/produto-edit/produto-edit.component';
import { PedidoListComponent } from 'app/pedido-list/pedido-list.component';
import { PedidoEditComponent } from 'app/pedido-edit/pedido-edit.component';

import { PessoaService } from 'app/services/pessoa.service';
import { ProdutoService } from 'app/services/produto.service';
import { MessageService } from 'app/services/message.service';
import { PedidoService } from 'app/services/pedido.service';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTableModule, 
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  declarations: [
    PessoaListComponent,
    PessoaEditComponent,
    ProdutoListComponent,
    ProdutoEditComponent,
    PedidoListComponent,
    PedidoEditComponent,
    
  ],
  providers: [
    PessoaService,
    ProdutoService,
    PedidoService,
    MessageService
  ]
})

export class AdminLayoutModule {}
