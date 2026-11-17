
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, CurrencyPipe } from '@angular/common';
import { MangaService } from '../../services/manga';
import { CarrinhoService } from '../../services/carrinho';
import { Manga } from '../../models/manga';

@Component({
  selector: 'app-detalhes',
  imports: [NgIf, RouterLink, CurrencyPipe],
  templateUrl: './detalhes.html',
  styleUrl: './detalhes.css'
})
export class Detalhes implements OnInit {

  manga?: Manga;

  constructor(
    private rota: ActivatedRoute,
    private mangaService: MangaService,
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(this.rota.snapshot.paramMap.get('id'));

    this.manga = this.mangaService.buscarPorId(id);

  }

  adicionarAoCarrinho(): void {

    if (!this.manga) {
      return;
    }

    const sucesso = this.carrinhoService.adicionar(this.manga);

    if (sucesso) {
      alert('Mangá adicionado ao carrinho!');

      this.router.navigate(['/carrinho']);
    } else {
      alert('Não foi possível adicionar o mangá.');
    }

  }
}
