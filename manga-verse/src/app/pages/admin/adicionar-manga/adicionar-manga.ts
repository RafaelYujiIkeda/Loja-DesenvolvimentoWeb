import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { MangaService } from '../../../services/manga';
import { AuthService } from '../../../services/auth';

@Component({selector:'app-adicionar-manga',imports:[FormsModule,RouterLink,NgIf],templateUrl:'./adicionar-manga.html',styleUrl:'./adicionar-manga.css'})
export class AdicionarManga {
  nome='';autor='';genero='';preco:number|null=null;imagem='';descricao='';estoque:number|null=null;mensagem='';destaque=true; idEdicao:number|null=null;
  constructor(private mangaService:MangaService,private authService:AuthService,private router:Router,private route:ActivatedRoute){
    this.route.queryParamMap.subscribe(params=>{const id=Number(params.get('id'));if(id>0){this.idEdicao=id;this.mangaService.buscarPorId(id).subscribe({next:m=>{this.nome=m.nome;this.autor=m.autor;this.genero=m.genero;this.preco=m.preco;this.imagem=m.imagem;this.descricao=m.descricao;this.estoque=m.estoque;this.destaque=m.destaque??true;},error:()=>this.mensagem='Não foi possível carregar o produto.'});}});
  }
  cadastrarManga():void{
    if(!this.authService.ehAdmin()){this.router.navigate(['/login']);return;}
    if(!this.nome.trim()||!this.autor.trim()||!this.genero.trim()||!this.imagem.trim()||!this.descricao.trim()||this.preco===null||this.estoque===null||this.preco<=0||this.estoque<0||!Number.isInteger(this.estoque)){this.mensagem='Preencha todos os campos corretamente.';return;}
    const dados={id:this.idEdicao??0,nome:this.nome.trim(),autor:this.autor.trim(),genero:this.genero,preco:this.preco,imagem:this.imagem.trim(),descricao:this.descricao.trim(),estoque:this.estoque,destaque:this.destaque};
    const requisicao=this.idEdicao ? this.mangaService.editar(this.idEdicao,dados) : this.mangaService.adicionar(dados);
    requisicao.subscribe({
      next:()=>{alert(this.idEdicao?'Mangá atualizado com sucesso!':'Mangá cadastrado com sucesso!');this.router.navigate(['/admin']);},
      error:()=>this.mensagem='Não foi possível salvar o mangá.'
    });
  }
}
