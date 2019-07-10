
import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'app/services/pessoa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'pessoa-edit',
  templateUrl: './pessoa-edit.component.html',
  styleUrls: ['./pessoa-edit.component.css']
})
export class PessoaEditComponent implements OnInit {

  private dataSource: any;
  private registerForm: FormGroup;

  constructor(public fb: FormBuilder,
              private pessoaService: PessoaService,
              private messageService: MessageService,
              private router: Router,
              private activetedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = {};
    this.activetedRoute.params.subscribe(params => {
      var param:number = +params['id'];
      if(param) {
        this.buscarPessoa(param);
      }
    });

    this.registerForm = this.fb.group({
      id: [''],
      razaoSocial: ['', [<any>Validators.required]],
      email: ['', [<any>Validators.required]],
    });
   
  }

  salvar() {
    if (this.registerForm.invalid) {
      this.messageService.warning('Dados incompletos');
      return;
    }

    this.pessoaService.insertOrUpdade(this.dataSource).subscribe(
      (result: any) => {
        this.messageService.success('Salvo com sucesso!');  
        this.router.navigate(['/pessoa-list']); 
      },
      (error) => {
        console.log(error);
        this.messageService.error('Erro!'+error.message);  
    });
    
  }

  buscarPessoa(id: number) {
    this.pessoaService.getPessoa(id).subscribe(
      (value) => {
        this.dataSource = value;
      },
      (error) => {
        console.log(error);  
      }
    );
  }

  cancelar() {
    this.router.navigate(['/pessoa-list']); 
  }

}
