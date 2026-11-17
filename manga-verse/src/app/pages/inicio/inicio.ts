
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';

import { MangaService } from '../../services/manga';
import { Manga } from '../../models/manga';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, NgFor, NgIf, CurrencyPipe],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {

  mangasDestaque: Manga[] = [];

  constructor(
    private mangaService: MangaService
  ) {}

  ngOnInit(): void {

    this.carregarDestaques();

  }

  carregarDestaques(): void {

    this.mangasDestaque =
      this.mangaService.listarMangas().slice(0, 3);

  }

}
