
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Manga } from '../models/manga';
import { ItemCarrinho } from '../models/item-carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private itens: ItemCarrinho[] = [];

  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);

  carrinho$ = this.carrinhoSubject.asObservable();

  constructor() {
    const dados = localStorage.getItem('carrinho');

    if (dados) {
      this.itens = JSON.parse(dados);
    }

    this.atualizarCarrinho();
  }

  private atualizarCarrinho(): void {

    localStorage.setItem('carrinho', JSON.stringify(this.itens));

    this.carrinhoSubject.next([...this.itens]);
  }

  adicionar(manga: Manga, quantidade: number = 1): boolean {

    const item = this.itens.find(
      produto => produto.manga.id === manga.id
    );

    const quantidadeAtual = item ? item.quantidade : 0;

    if (
      quantidade <= 0 ||
      quantidadeAtual + quantidade > manga.estoque
    ) {
      return false;
    }

    if (item) {
      item.quantidade += quantidade;
    } else {
      this.itens.push({
        manga: manga,
        quantidade: quantidade
      });
    }

    this.atualizarCarrinho();

    return true;
  }

  remover(id: number): void {

    this.itens = this.itens.filter(
      item => item.manga.id !== id
    );

    this.atualizarCarrinho();
  }

  alterarQuantidade(id: number, quantidade: number): boolean {

    const item = this.itens.find(
      produto => produto.manga.id === id
    );

    if (!item || quantidade < 1 || quantidade > item.manga.estoque) {
      return false;
    }

    item.quantidade = quantidade;

    this.atualizarCarrinho();

    return true;
  }

  listar(): ItemCarrinho[] {
    return this.itens;
  }

  calcularTotal(): number {

    return this.itens.reduce(
      (total, item) =>
        total + item.manga.preco * item.quantidade,
      0
    );

  }

  limpar(): void {
    this.itens = [];
    this.atualizarCarrinho();
  }
}
