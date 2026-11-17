
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';
import { CarrinhoService } from '../../services/carrinho';
import { ItemCarrinho } from '../../models/item-carrinho';

@Component({
  selector: 'app-carrinho',
  imports: [NgFor, NgIf, CurrencyPipe, RouterLink],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css'
})
export class Carrinho implements OnInit, OnDestroy {

  itens: ItemCarrinho[] = [];

  private inscricao?: Subscription;

  constructor(
    public carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {

    this.inscricao = this.carrinhoService.carrinho$.subscribe(
      dados => {
        this.itens = dados;
      }
    );

  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }

  alterarQuantidade(id: number, quantidade: number): void {

    const sucesso = this.carrinhoService.alterarQuantidade(
      id,
      quantidade
    );

    if (!sucesso) {
      alert('Quantidade inválida ou estoque insuficiente.');
    }

  }

  remover(id: number): void {
    this.carrinhoService.remover(id);
  }

  finalizarCompra(): void {

    if (this.itens.length === 0) {
      return;
    }

    const total = this.carrinhoService.calcularTotal();

    alert(
      'Compra realizada com sucesso!\nTotal: ' +
      total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    );

    this.carrinhoService.limpar();

  }

}
