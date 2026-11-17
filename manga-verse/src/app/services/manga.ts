
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
      imagem: 'one-piece.jpg',
      descricao: 'Acompanhe Monkey D. Luffy em sua jornada para encontrar o lendário tesouro One Piece.',
      estoque: 10
    },

    {
      id: 2,
      nome: 'Naruto',
      autor: 'Masashi Kishimoto',
      genero: 'Ação',
      preco: 34.90,
      imagem: 'naruto.jpg',
      descricao: 'Conheça a jornada de Naruto Uzumaki para se tornar o Hokage de sua vila.',
      estoque: 15
    },

    {
      id: 3,
      nome: 'Jujutsu Kaisen',
      autor: 'Gege Akutami',
      genero: 'Sobrenatural',
      preco: 36.90,
      imagem: 'jujutsu.jpg',
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

private chave = 'mangas';

constructor() {

  const dados = localStorage.getItem(this.chave);

  if (dados) {
    this.mangas = JSON.parse(dados) as Manga[];
  } else {
    this.salvar();
  }

}

private salvar(): void {

  localStorage.setItem(
    this.chave,
    JSON.stringify(this.mangas)
  );

}

adicionar(manga: Manga): void {

  manga.id = this.mangas.length > 0
    ? Math.max(...this.mangas.map(item => item.id)) + 1
    : 1;

  this.mangas.push(manga);

  this.salvar();

}

editar(id: number, dados: Manga): boolean {

  const indice = this.mangas.findIndex(
    manga => manga.id === id
  );

  if (indice === -1) {
    return false;
  }

  this.mangas[indice] = {
    ...dados,
    id: id
  };

  this.salvar();

  return true;

}

excluir(id: number): void {

  this.mangas = this.mangas.filter(
    manga => manga.id !== id
  );

  this.salvar();

}


}
