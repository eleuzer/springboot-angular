import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService } from 'app/services/pessoa.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  private displayedColumns: string[] = ['id', 'razaoSocial', 'email', 'actions'];
  private listPessoas: Array<any>;
  private resultsLength = 0;

  constructor(private pessoaService: PessoaService,
              private router: Router) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.listarPessoasLazy();
  } 

  listarPessoasLazy() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.pessoaService.listPagination(this.paginator, this.sort);
        }),
        map(data => {
          this.resultsLength = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => {
        this.listPessoas = data
      });
  

  }

  editar(pessoa: any) {
    this.router.navigate(['/pessoa-edit/'+pessoa.id]);
  }

  remover(pessoa: any) {
    this.pessoaService.remove(pessoa).subscribe(
      (values) => {
        this.listarPessoasLazy();
      }
    )
  }

}
