import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MatPaginator, MatSort } from "@angular/material";
import { Settings } from "app/util/settings";

@Injectable()
export class PessoaService {

    constructor(private httpClient: HttpClient) {

    }

    insertOrUpdade(pessoa: any): Observable<any> {
        if (pessoa.id) {
            return this.update(pessoa);
        } else {
            return this.insert(pessoa);
        }

    }

    insert(pessoa: any): Observable<any> {
        return this.httpClient.post(`${Settings.URL_SERVICE}/pessoa`, pessoa);
    }

    update(pessoa: any): Observable<any> {
        let id = pessoa.id;
        return this.httpClient.put(`${Settings.URL_SERVICE}/pessoa/${id}`, pessoa);
    }

    remove(pessoa: any): Observable<any> {
        let id = pessoa.id;
        return this.httpClient.delete(`${Settings.URL_SERVICE}/pessoa/${id}`);
    }

    getPessoa(id: number): Observable<any> {
        return this.httpClient.get(`${Settings.URL_SERVICE}/pessoa/${id}`);
    }

    listAll(): Observable<any> {
        return this.httpClient.get(`${Settings.URL_SERVICE}/pessoas`);
    }
    
    listPagination(paginator: MatPaginator, sort: MatSort): Observable<any> {
       return this.httpClient.get(`${Settings.URL_SERVICE}/pessoas/pagination/?page=${paginator.pageIndex}&size=${paginator.pageSize}&sort=${sort.active},${sort.direction.toUpperCase()}`);
    } 



}