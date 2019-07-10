import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from 'app/services/produto.service';
import { Router } from '@angular/router';
import { MatSort, MatPaginator } from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  private displayedColumns: string[] = ['id', 'descricao', 'preco', 'actions'];
  private listProdutos: Array<any>;
  private resultsLength = 0;

  constructor(private produtoService: ProdutoService,
              private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.listarProdutosLazy();
  } 

  listarProdutosLazy() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.produtoService.listPagination(this.paginator, this.sort);
        }),
        map(data => {
          this.resultsLength = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => {
        this.listProdutos = data
      });
  

  }

  editar(produto: any) {
    this.router.navigate(['/produto-edit/'+produto.id]);
  }

  remover(produto: any) {
    this.produtoService.remove(produto).subscribe(
      (values) => {
        this.listarProdutosLazy();
      }
    )
  }

}
