import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Manga } from '../../models/manga';
import { MangaService } from '../../services/manga';

@Component({ selector: 'app-catalogo', imports: [NgFor, NgIf, CurrencyPipe], templateUrl: './catalogo.html', styleUrl: './catalogo.css' })
export class Catalogo implements OnInit {
  mangas: Manga[]=[]; carregando=true; erro='';
  constructor(private mangaService:MangaService,private router:Router){}
  ngOnInit():void{this.mangaService.listarMangas().subscribe({next:d=>{this.mangas=d;this.carregando=false;},error:()=>{this.erro='Não foi possível carregar o catálogo.';this.carregando=false;}});}
  verDetalhes(id:number):void{this.router.navigate(['/detalhes',id]);}
}
