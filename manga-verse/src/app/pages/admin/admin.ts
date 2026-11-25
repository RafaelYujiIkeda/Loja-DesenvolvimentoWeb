import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Manga } from '../../models/manga';
import { Usuario } from '../../models/usuario';
import { Pedido } from '../../models/pedido';
import { AuthService } from '../../services/auth';
import { AdminApiService } from '../../services/admin-api';

@Component({selector:'app-admin',imports:[NgFor,NgIf,CurrencyPipe,FormsModule],templateUrl:'./admin.html',styleUrl:'./admin.css'})
export class Admin implements OnInit {
  aba:'clientes'|'pedidos'|'produtos'='clientes'; clientes:Usuario[]=[]; pedidos:Pedido[]=[]; mangas:Manga[]=[];
  clienteEdicao:Usuario|null=null; pedidoEdicao:Pedido={status:'RECEBIDO',valorTotal:0};
  mensagem=''; carregando=false; codigoBuscaProduto: number | null = null; produtoEncontrado: Manga | null = null;
  constructor(private api:AdminApiService,private auth:AuthService,private router:Router){}
  ngOnInit():void{if(!this.auth.ehAdmin()){this.router.navigate(['/login']);return;}this.carregarTudo();}
  carregarTudo():void{this.carregarClientes();this.carregarPedidos();this.carregarProdutos();}
  carregarClientes():void{this.api.listarClientes().subscribe({next:x=>this.clientes=x,error:()=>this.mensagem='Erro ao carregar clientes.'});}
  editarCliente(c:Usuario):void{this.clienteEdicao={...c};}
  salvarCliente():void{if(!this.clienteEdicao?.codigo)return;this.api.atualizarCliente(this.clienteEdicao.codigo,this.clienteEdicao).subscribe({next:()=>{this.mensagem='Cadastro atualizado.';this.clienteEdicao=null;this.carregarClientes();},error:()=>this.mensagem='Erro ao atualizar cliente.'});}
  excluirCliente(c:Usuario):void{if(!c.codigo||!confirm(`Excluir a conta de ${c.nome}?`))return;this.api.excluirCliente(c.codigo).subscribe({next:()=>this.carregarClientes(),error:()=>this.mensagem='Não foi possível excluir. Verifique se existem pedidos vinculados.'});}
  alterarSenha(c:Usuario):void{const nova=prompt(`Nova senha para ${c.email} (mínimo 8 caracteres):`);if(!c.codigo||nova===null)return;if(nova.length<8){this.mensagem='A senha deve ter pelo menos 8 caracteres.';return;}this.api.alterarSenha(c.codigo,nova).subscribe({next:()=>this.mensagem='Senha alterada.',error:()=>this.mensagem='Erro ao alterar senha.'});}
  carregarPedidos():void{this.api.listarPedidos().subscribe({next:x=>this.pedidos=x,error:()=>this.mensagem='Erro ao carregar pedidos.'});}
  novoPedido():void{this.pedidoEdicao={status:'RECEBIDO',valorTotal:0,itensJson:'[]'};}
  salvarPedido():void{const p=this.pedidoEdicao;if(!p.clienteCodigo||!p.itensJson){this.mensagem='Informe o código do cliente e os itens em JSON.';return;}let obs=p.codigoPedido?this.api.alterarPedido(p.codigoPedido,p):this.api.cadastrarPedido(p);obs.subscribe({next:()=>{this.mensagem='Pedido salvo.';this.novoPedido();this.carregarPedidos();},error:()=>this.mensagem='Erro ao salvar pedido.'});}
  editarPedido(p:Pedido):void{this.pedidoEdicao={...p};}
  excluirPedido(p:Pedido):void{if(!p.codigoPedido||!confirm('Excluir este pedido?'))return;this.api.excluirPedido(p.codigoPedido).subscribe({next:()=>this.carregarPedidos(),error:()=>this.mensagem='Erro ao excluir pedido.'});}
  carregarProdutos():void{this.api.listarProdutos().subscribe({next:x=>this.mangas=x,error:()=>this.mensagem='Erro ao carregar produtos.'});}
  consultarProdutoPorCodigo():void{if(this.codigoBuscaProduto===null || this.codigoBuscaProduto<=0){this.mensagem='Informe um código de produto válido.';return;}this.api.consultarProduto(this.codigoBuscaProduto).subscribe({next:m=>{this.produtoEncontrado=m;this.mensagem='Produto encontrado.';},error:()=>{this.produtoEncontrado=null;this.mensagem='Produto não encontrado.';}});}
  excluirManga(id:number):void{if(!confirm('Excluir este mangá?'))return;this.api.excluirProduto(id).subscribe({next:()=>this.carregarProdutos(),error:()=>this.mensagem='Erro ao excluir produto.'});}
  editarManga(m:Manga):void{this.router.navigate(['/admin/adicionar-manga'],{queryParams:{id:m.id}});}
  novoManga():void{this.router.navigate(['/admin/adicionar-manga']);}
  sair():void{this.auth.logout();this.router.navigate(['/login']);}
}
