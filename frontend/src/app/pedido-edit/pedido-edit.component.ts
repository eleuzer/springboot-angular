
import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PessoaService } from 'app/services/pessoa.service';
import { ProdutoService } from 'app/services/produto.service';
import { MessageService } from 'app/services/message.service';
import { Pedido } from 'app/model/pedido';
import { ItemPedido } from 'app/model/itemPedido';

@Component({
  selector: 'pedido-edit',
  templateUrl: './pedido-edit.component.html',
  styleUrls: ['./pedido-edit.component.css']
})
export class PedidoEditComponent implements OnInit {

  private dataSource: Pedido;
  private newItemPedido: ItemPedido;
  private registerForm: FormGroup;
  protected listClientes: Array<any>;
  protected listProdutos: Array<any>;

  constructor(public fb: FormBuilder,
              private pedidoService: PedidoService,
              private pessoaService: PessoaService,
              private produtoService: ProdutoService,
              private messageService: MessageService,
              private router: Router,
              private activetedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = new Pedido();
    this.newItemPedido = new ItemPedido();
    this.dataSource.itemPedidos = [];
    this.activetedRoute.params.subscribe(params => {
      var param:number = +params['id'];
      if(param) {
        this.buscarPedido(param);
      }
    });

    this.registerForm = this.fb.group({
      id: [''],
      pessoa: ['', [<any>Validators.required]],
      produto: ['', [<any>Validators.required]],
      quantidade: ['', [<any>Validators.required]],
    });

    this.listarProdutos();
    this.listarClientes();   
  }

  listarProdutos() {
    this.produtoService.listAll().subscribe(
      (values) => {
        this.listProdutos = values;
      }
    );
  }

  listarClientes() {
    this.pessoaService.listAll().subscribe(
      (values) => {
        this.listClientes = values;
      }
    );
  }

  adicionarItemPedido() {
    if (this.registerForm.invalid) {
      this.messageService.warning('Dados incompletos');
      return;
    }

    if(this.dataSource.itemPedidos.indexOf(this.newItemPedido) < 0) {
      let permitirAdd: boolean = !this.dataSource.itemPedidos.find((element, index, array) => {
        return element.produto.id === this.newItemPedido.produto.id;
      });
    
      if(!permitirAdd) {
        this.messageService.warning('Este produto ja foi adicionado!');
        return;
      }

      this.newItemPedido.precoUnitario = this.newItemPedido.produto.preco;
      this.newItemPedido.precoTotal = (this.newItemPedido.produto.preco * this.newItemPedido.quantidade);
      this.dataSource.itemPedidos.push(this.newItemPedido);
    }

    this.newItemPedido = new ItemPedido();
  }

  salvar() {
    if (this.dataSource.itemPedidos.length == 0) {
      this.messageService.warning('Dados incompletos');
      alert('Dados incompletos!');
      return;
    }

    this.pedidoService.insertOrUpdade(this.dataSource).subscribe(
      (result: any) => {
        this.messageService.success('Salvo com sucesso!');  
        this.router.navigate(['/pedido-list']); 
      },
      (error) => {
        console.log(error);
        this.messageService.error('Erro!'+error.message);  
    });
    
  }

  buscarPedido(id: number) {
    this.pedidoService.getPedido(id).subscribe(
      (value) => {
        this.dataSource = value;
      },
      (error) => {
        console.log(error);  
      }
    );
  }

  cancelar() {
    this.router.navigate(['/pedido-list']); 
  }

}
