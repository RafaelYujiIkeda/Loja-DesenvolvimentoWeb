
import { Injectable } from '@angular/core';
import { Manga } from '../models/manga';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  private mangas: Manga[] = [
    {
      id: 1,
      nome: 'One Piece',
      autor: 'Eiichiro Oda',
      genero: 'Aventura',
      preco: 39.90,
      imagem: 'assets/imagens/one-piece.jpg',
      descricao: 'Acompanhe Monkey D. Luffy em sua jornada para encontrar o lendário tesouro One Piece.',
      estoque: 10
    },
    {
      id: 2,
      nome: 'Naruto',
      autor: 'Masashi Kishimoto',
      genero: 'Ação',
      preco: 34.90,
      imagem: 'assets/imagens/naruto.jpg',
      descricao: 'Conheça a jornada de Naruto Uzumaki para se tornar o Hokage de sua vila.',
      estoque: 15
    },
    {
      id: 3,
      nome: 'Jujutsu Kaisen',
      autor: 'Gege Akutami',
      genero: 'Sobrenatural',
      preco: 36.90,
      imagem: 'assets/imagens/jujutsu.jpg',
      descricao: 'Yuji Itadori entra no mundo das maldições após um acontecimento inesperado.',
      estoque: 8
    }
  ];

  listarMangas(): Manga[] {
    return this.mangas;
  }

  buscarPorId(id: number): Manga | undefined {
    return this.mangas.find(manga => manga.id === id);
  }
}
