import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({ selector: 'app-cadastro', imports: [FormsModule, RouterLink, NgIf], templateUrl: './cadastro.html', styleUrl: './cadastro.css' })
export class Cadastro {
  nome=''; email=''; senha=''; confirmarSenha=''; documento=''; mensagem=''; sucesso=false;
  constructor(private authService: AuthService, private router: Router) {}
  cadastrar(): void {
    this.mensagem=''; this.sucesso=false;
    const email=this.email.trim().toLowerCase();
    if(!this.nome.trim()||!email||!this.senha||!this.confirmarSenha){this.mensagem='Preencha todos os campos.';return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){this.mensagem='Digite um e-mail válido.';return;}
    if(this.senha.length<8){this.mensagem='A senha deve ter pelo menos 8 caracteres.';return;}
    if(this.senha!==this.confirmarSenha){this.mensagem='As senhas não coincidem.';return;}
    this.authService.cadastrar(this.nome.trim(),email,this.senha,this.documento).subscribe({
      next:()=>{this.sucesso=true;this.mensagem='Cadastro realizado com sucesso!';setTimeout(()=>this.router.navigate(['/login']),1200);},
      error:(e)=>this.mensagem=e.status===409?'Este e-mail já está cadastrado.':'Não foi possível realizar o cadastro.'
    });
  }
}
