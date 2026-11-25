import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({ providedIn: 'root' })
export class PedidoApiService {
  private readonly chave = 'mangaversePedidos';
  private todos(): Pedido[] { return JSON.parse(localStorage.getItem(this.chave) || '[]') as Pedido[]; }
  private salvar(lista: Pedido[]): void { localStorage.setItem(this.chave, JSON.stringify(lista)); }
  cadastrar(pedido: Pedido): Observable<Pedido> {
    const lista = this.todos(); const codigoPedido = lista.reduce((m, p) => Math.max(m, p.codigoPedido ?? 0), 0) + 1;
    const novo = { ...pedido, codigoPedido, dataPedido: new Date().toISOString(), status: pedido.status || 'RECEBIDO' };
    lista.push(novo); this.salvar(lista); return of(novo);
  }
  listarDoCliente(codigo: number): Observable<Pedido[]> { return of(this.todos().filter(p => p.clienteCodigo === codigo)); }
  listarTodos(): Observable<Pedido[]> { return of(this.todos()); }
  consultar(codigo: number): Observable<Pedido> { const p = this.todos().find(x => x.codigoPedido === codigo); return p ? of(p) : throwError(() => new Error('Pedido não encontrado.')); }
  atualizar(codigo: number, dados: Pedido): Observable<Pedido> {
    const lista = this.todos(); const i = lista.findIndex(p => p.codigoPedido === codigo);
    if (i < 0) return throwError(() => new Error('Pedido não encontrado.'));
    lista[i] = { ...lista[i], ...dados, codigoPedido: codigo }; this.salvar(lista); return of(lista[i]);
  }
  excluir(codigo: number): Observable<string> { this.salvar(this.todos().filter(p => p.codigoPedido !== codigo)); return of('Pedido excluído.'); }
}
