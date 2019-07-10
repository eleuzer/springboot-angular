import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Settings } from "app/util/settings";

@Injectable()
export class PedidoService {

    constructor(private httpClient: HttpClient) {

    }

    insertOrUpdade(pedido: any): Observable<any> {
        if (pedido.id) {
            return this.update(pedido);
        } else {
            return this.insert(pedido);
        }

    }

    insert(pedido: any): Observable<any> {
        return this.httpClient.post(`${Settings.URL_SERVICE}/pedido`, pedido);
    }

    update(pedido: any): Observable<any> {
        let id = pedido.id;
        return this.httpClient.put(`${Settings.URL_SERVICE}/pedido/${id}`, pedido);
    }

    remove(pedido: any): Observable<any> {
        let id = pedido.id;
        return this.httpClient.delete(`${Settings.URL_SERVICE}/pedido/${id}`);
    }

    getPedido(id: number): Observable<any> {
        return this.httpClient.get(`${Settings.URL_SERVICE}/pedido/${id}`);
    }

    listAll(): Observable<any> {
        return this.httpClient.get(`${Settings.URL_SERVICE}/pedidos`);
    }

  


}