import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarrinhoService } from '../../services/carrinho';
import { ItemCarrinho } from '../../models/item-carrinho';
import { PedidoApiService } from '../../services/pedido-api';
import { AuthService } from '../../services/auth';

@Component({selector:'app-carrinho',imports:[NgFor,NgIf,CurrencyPipe,RouterLink],templateUrl:'./carrinho.html',styleUrl:'./carrinho.css'})
export class Carrinho implements OnInit,OnDestroy {
  itens:ItemCarrinho[]=[]; private inscricao?:Subscription; finalizando=false;
  constructor(public carrinhoService:CarrinhoService,private pedidos:PedidoApiService,private auth:AuthService,private router:Router){}
  ngOnInit():void{this.inscricao=this.carrinhoService.carrinho$.subscribe(d=>this.itens=d);}
  ngOnDestroy():void{this.inscricao?.unsubscribe();}
  alterarQuantidade(id:number,q:number):void{if(!this.carrinhoService.alterarQuantidade(id,q))alert('Quantidade inválida ou estoque insuficiente.');}
  remover(id:number):void{this.carrinhoService.remover(id);}
  finalizarCompra():void{
    const usuario=this.auth.obterUsuarioLogado();
    if(!usuario){alert('Entre na sua conta antes de finalizar a compra.');this.router.navigate(['/login']);return;}
    if(!this.itens.length||this.finalizando)return;
    this.finalizando=true;
    const pedido={clienteCodigo:usuario.codigo,clienteNome:usuario.nome,
      itensJson:JSON.stringify(this.itens.map(i=>({produtoCodigo:i.manga.id,nome:i.manga.nome,quantidade:i.quantidade,preco:i.manga.preco}))),
      status:'RECEBIDO',valorTotal:this.carrinhoService.calcularTotal()};
    this.pedidos.cadastrar(pedido).subscribe({next:p=>{this.finalizando=false;this.carrinhoService.limpar();alert(`Pedido #${p.codigoPedido} realizado com sucesso!`);this.router.navigate(['/pedidos']);},error:()=>{this.finalizando=false;alert('Não foi possível registrar o pedido. Verifique a API.');}});
  }
}
