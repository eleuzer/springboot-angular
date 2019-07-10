import { Pessoa } from "./pessoa";
import { ItemPedido } from "./itemPedido";

export class Pedido {
    id: number;
    data: Date;
    valorTotal: number;
    pessoa: Pessoa;
    itemPedidos:Array<ItemPedido>;
}