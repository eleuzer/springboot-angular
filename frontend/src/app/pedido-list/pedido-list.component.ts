import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {

  private listPedidos: Array<any>;

  constructor(private pedidoService: PedidoService,
              private router: Router) { }

  ngOnInit() {
    this.listarpedidos();
  }

  listarpedidos() {
    this.pedidoService.listAll().subscribe(
      (values) => {
        this.listPedidos = values;
      }
    )
  }

  editar(pedido: any) {
    this.router.navigate(['/pedido-edit/'+pedido.id]);
  }

  remover(pedido: any) {
    this.pedidoService.remove(pedido.id).subscribe(
      (values) => {
        this.listarpedidos();
      }
    )
  }

}
