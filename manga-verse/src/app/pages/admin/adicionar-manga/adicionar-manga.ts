
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { MangaService } from '../../../services/manga';
import { AuthService } from '../../../services/auth';
import { Manga } from '../../../models/manga';

@Component({
  selector: 'app-adicionar-manga',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './adicionar-manga.html',
  styleUrl: './adicionar-manga.css'
})
export class AdicionarManga {

  nome = '';
  autor = '';
  genero = '';
  preco: number | null = null;
  imagem = '';
  descricao = '';
  estoque: number | null = null;

  mensagem = '';

  constructor(
    private mangaService: MangaService,
    private authService: AuthService,
    private router: Router
  ) {}

  cadastrarManga(): void {

    if (!this.authService.ehAdmin()) {
      this.router.navigate(['/login']);
      return;
    }

    if (
      !this.nome.trim() ||
      !this.autor.trim() ||
      !this.genero.trim() ||
      !this.imagem.trim() ||
      !this.descricao.trim() ||
      this.preco === null ||
      this.estoque === null ||
      !Number.isFinite(this.preco) ||
      !Number.isInteger(this.estoque) ||
      this.preco <= 0 ||
      this.estoque < 0
    ) {
      this.mensagem = 'Preencha todos os campos corretamente.';
      return;
    }

    const novoManga: Manga = {
      id: 0,
      nome: this.nome.trim(),
      autor: this.autor.trim(),
      genero: this.genero.trim(),
      preco: this.preco,
      imagem: this.imagem.trim(),
      descricao: this.descricao.trim(),
      estoque: this.estoque
    };

    this.mangaService.adicionar(novoManga);

    alert('Mangá cadastrado com sucesso!');

    this.router.navigate(['/admin']);

  }

}
