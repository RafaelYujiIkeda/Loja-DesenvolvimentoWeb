import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth';
import { MangaService } from './manga';
import { PedidoApiService } from './pedido-api';
import { Usuario } from '../models/usuario';
import { Pedido } from '../models/pedido';
import { Manga } from '../models/manga';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  constructor(private auth: AuthService, private mangas: MangaService, private pedidos: PedidoApiService) {}
  listarClientes(): Observable<Usuario[]> { return of(this.auth.listarClientes()); }
  atualizarCliente(codigo: number, cliente: Partial<Usuario>): Observable<string> { return this.auth.atualizarCliente(codigo, cliente); }
  excluirCliente(codigo: number): Observable<string> { return this.auth.excluirCliente(codigo); }
  alterarSenha(codigo: number, senha: string): Observable<string> { return this.auth.alterarSenhaCliente(codigo, senha); }
  listarPedidos(): Observable<Pedido[]> { return this.pedidos.listarTodos(); }
  cadastrarPedido(pedido: Pedido): Observable<Pedido> { return this.pedidos.cadastrar(pedido); }
  alterarPedido(codigo: number, pedido: Pedido): Observable<Pedido> { return this.pedidos.atualizar(codigo, pedido); }
  excluirPedido(codigo: number): Observable<string> { return this.pedidos.excluir(codigo); }
  listarProdutos(): Observable<Manga[]> { return this.mangas.listarMangas(); }
  consultarProduto(codigo: number): Observable<Manga> { return this.mangas.buscarPorId(codigo); }
  excluirProduto(codigo: number): Observable<string> { return this.mangas.excluir(codigo); }
}
