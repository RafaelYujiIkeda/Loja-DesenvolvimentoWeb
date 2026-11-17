
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MangaService } from '../../services/manga';
import { AuthService } from '../../services/auth';
import { Manga } from '../../models/manga';

@Component({
  selector: 'app-admin',
  imports: [NgFor, NgIf, CurrencyPipe, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  mangas: Manga[] = [];

  constructor(
    private mangaService: MangaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    if (!this.authService.ehAdmin()) {
      this.router.navigate(['/login']);
      return;
    }

    this.atualizarLista();

  }

  atualizarLista(): void {
    this.mangas = this.mangaService.listarMangas();
  }

  excluirManga(id: number): void {

    const confirmar = confirm(
      'Deseja realmente excluir este mangá?'
    );

    if (confirmar) {
      this.mangaService.excluir(id);
      this.atualizarLista();
    }

  }

  novoManga(): void {
    this.router.navigate(['/admin/adicionar-manga']);
  }

}
