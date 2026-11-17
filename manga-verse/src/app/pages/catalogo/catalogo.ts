
import { Component, OnInit } from '@angular/core';
import { Manga } from '../../models/manga';
import { MangaService } from '../../services/manga';
import { NgFor, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  imports: [NgFor, CurrencyPipe],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {

  mangas: Manga[] = [];

  constructor(
    private mangaService: MangaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mangas = this.mangaService.listarMangas();
  }

  verDetalhes(id: number): void {
    this.router.navigate(['/detalhes', id]);
  }
}
