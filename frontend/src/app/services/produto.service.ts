import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Settings } from "app/util/settings";
import { MatPaginator, MatSort } from "@angular/material";

@Injectable()
export class ProdutoService {

    constructor(private httpClient: HttpClient) {

    }

    insertOrUpdade(produto: any): Observable<any> {
        if (produto.id) {
            return this.update(produto);
        } else {
            return this.insert(produto);
        }

    }

    insert(produto: any): Observable<any> {
        return this.httpClient.post(`${Settings.URL_SERVICE}/produto`, produto);
    }

    update(produto: any): Observable<any> {
        let id = produto.id;
        return this.httpClient.put(`${Settings.URL_SERVICE}/produto/${id}`, produto);
    }

    remove(produto: any): Observable<any> {
        let id = produto.id;
        return this.httpClient.delete(`${Settings.URL_SERVICE}/produto/${id}`);
    }

    getProduto(id: number): Observable<any> {
        return this.httpClient.get(`${Settings.URL_SERVICE}/produto/${id}`);
    }

    listAll(): Observable<any> {
        return this.httpClient.get(`${Settings.URL_SERVICE}/produtos`);
    }

    listPagination(paginator: MatPaginator, sort: MatSort): Observable<any> {
        return this.httpClient.get(`${Settings.URL_SERVICE}/produtos/pagination/?page=${paginator.pageIndex}&size=${paginator.pageSize}&sort=${sort.active},${sort.direction.toUpperCase()}`);
    } 



}