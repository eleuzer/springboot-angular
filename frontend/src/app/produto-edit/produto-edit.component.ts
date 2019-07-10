
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'app/services/produto.service';
import { MessageService } from 'app/services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from 'app/model/produto';

@Component({
  selector: 'produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  private dataSource: Produto;
  private registerForm: FormGroup;

  constructor(public fb: FormBuilder,
              private produtoService: ProdutoService,
              private messageService: MessageService,
              private router: Router,
              private activetedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = new Produto();
    this.activetedRoute.params.subscribe(params => {
      var param:number = +params['id'];
      if(param) {
        this.buscarProduto(param);
      }
    });

    this.registerForm = this.fb.group({
      id: [''],
      descricao: ['', [<any>Validators.required]],
      preco: ['', [<any>Validators.required]],
    });
   
  }

  salvar() {
    if (this.registerForm.invalid) {
      this.messageService.warning('Dados incompletos');
      return;
    }

    this.produtoService.insertOrUpdade(this.dataSource).subscribe(
      (result: any) => {
        this.messageService.success('Salvo com sucesso!');  
        this.router.navigate(['/produto-list']); 
      },
      (error) => {
        console.log(error);
        this.messageService.error('Erro!'+error.message);  
    });
    
  }

  buscarProduto(id: number) {
    this.produtoService.getProduto(id).subscribe(
      (value) => {
        this.dataSource = value;
      },
      (error) => {
        console.log(error);  
      }
    );
  }

  cancelar() {
    this.router.navigate(['/produto-list']); 
  }

}
