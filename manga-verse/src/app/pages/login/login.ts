import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({ selector: 'app-login', imports: [FormsModule, RouterLink, NgIf], templateUrl: './login.html', styleUrl: './login.css' })
export class Login {
  email = ''; senha = ''; mensagem = ''; carregando = false;
  constructor(private authService: AuthService, private router: Router) {}
  entrar(): void {
    this.mensagem = '';
    if (!this.email.trim() || !this.senha) { this.mensagem = 'Preencha todos os campos.'; return; }
    this.carregando = true;
    this.authService.login(this.email.trim().toLowerCase(), this.senha).subscribe({
      next: () => { this.carregando = false; this.router.navigate([this.authService.obterUsuarioLogado()?.tipo === 'admin' ? '/admin' : '/catalogo']); },
      error: () => { this.carregando = false; this.mensagem = 'E-mail ou senha incorretos.'; }
    });
  }
}
