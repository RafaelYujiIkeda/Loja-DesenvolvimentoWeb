
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  senha = '';

  mensagem = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  entrar(): void {

    this.mensagem = '';

    if (!this.email.trim() || !this.senha) {
      this.mensagem = 'Preencha todos os campos.';
      return;
    }

    const autenticado = this.authService.login(
      this.email.trim().toLowerCase(),
      this.senha
    );

    if (!autenticado) {
      this.mensagem = 'E-mail ou senha incorretos.';
      return;
    }

    const usuario = this.authService.obterUsuarioLogado();

    if (usuario?.tipo === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/catalogo']);
    }

  }

}
