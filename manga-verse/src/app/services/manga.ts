import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Manga } from '../models/manga';

@Injectable({ providedIn: 'root' })
export class MangaService {
  private readonly chave = 'mangaverseMangas';
  constructor() { this.inicializar(); }

  private inicializar(): void {
    if (localStorage.getItem(this.chave) !== null) return;
    const iniciais: Manga[] = [
      { id: 1, nome: 'One Piece', autor: 'Eiichiro Oda', genero: 'Aventura', preco: 39.90, imagem: '/one-piece.jpg', descricao: 'A jornada de Monkey D. Luffy em busca do maior tesouro dos mares.', estoque: 10, destaque: true },
      { id: 2, nome: 'Naruto', autor: 'Masashi Kishimoto', genero: 'Ação', preco: 34.90, imagem: '/naruto.jpg', descricao: 'A história de Naruto Uzumaki, um jovem ninja que deseja se tornar Hokage.', estoque: 10, destaque: true },
      { id: 3, nome: 'Jujutsu Kaisen', autor: 'Gege Akutami', genero: 'Sobrenatural', preco: 36.90, imagem: '/jujutsu.jpg', descricao: 'Yuji Itadori entra no mundo das maldições após um encontro inesperado.', estoque: 8, destaque: true }
    ];
    localStorage.setItem(this.chave, JSON.stringify(iniciais));
  }

  private todos(): Manga[] { return JSON.parse(localStorage.getItem(this.chave) || '[]') as Manga[]; }
  private salvar(lista: Manga[]): void { localStorage.setItem(this.chave, JSON.stringify(lista)); }
  listarMangas(): Observable<Manga[]> { return of(this.todos()); }
  carregarVitrine(): Observable<Manga[]> { return of(this.todos().filter(m => m.destaque)); }
  buscarPorId(id: number): Observable<Manga> { const m = this.todos().find(x => x.id === id); return m ? of(m) : throwError(() => new Error('Mangá não encontrado.')); }
  adicionar(dados: Omit<Manga, 'id'>): Observable<Manga> {
    const lista = this.todos(); const id = lista.reduce((maior, m) => Math.max(maior, m.id), 0) + 1;
    const novo: Manga = { ...dados, id }; lista.push(novo); this.salvar(lista); return of(novo);
  }
  editar(id: number, dados: Manga): Observable<Manga> {
    const lista = this.todos(); const i = lista.findIndex(m => m.id === id);
    if (i < 0) return throwError(() => new Error('Mangá não encontrado.'));
    lista[i] = { ...dados, id }; this.salvar(lista); return of(lista[i]);
  }
  excluir(id: number): Observable<string> { this.salvar(this.todos().filter(m => m.id !== id)); return of('Mangá excluído.'); }
}
