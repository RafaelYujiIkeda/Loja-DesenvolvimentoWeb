import { Component, OnInit } from '@angular/core';
import { NgFor,NgIf,CurrencyPipe,DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { PedidoApiService } from '../../services/pedido-api';
import { Pedido } from '../../models/pedido';
@Component({selector:'app-pedidos',imports:[NgFor,NgIf,CurrencyPipe,DatePipe,RouterLink],templateUrl:'./pedidos.html',styleUrl:'./pedidos.css'})
export class Pedidos implements OnInit {
  pedidos:Pedido[]=[]; carregando=true; erro='';
  constructor(private auth:AuthService,private api:PedidoApiService){}
  ngOnInit():void{const u=this.auth.obterUsuarioLogado();if(!u?.codigo){this.erro='Entre na sua conta para consultar seus pedidos.';this.carregando=false;return;}this.api.listarDoCliente(u.codigo).subscribe({next:p=>{this.pedidos=p;this.carregando=false;},error:()=>{this.erro='Não foi possível carregar seus pedidos.';this.carregando=false;}});}
}
