
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  mensagem = '';
  sucesso = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cadastrar(): void {

    this.mensagem = '';
    this.sucesso = false;

    if (
      !this.nome.trim() ||
      !this.email.trim() ||
      !this.senha ||
      !this.confirmarSenha
    ) {
      this.mensagem = 'Preencha todos os campos.';
      return;
    }

    const emailNormalizado = this.email.trim().toLowerCase();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      emailNormalizado
    );

    if (!emailValido) {
      this.mensagem = 'Digite um e-mail válido.';
      return;
    }

    if (this.senha.length < 8) {
      this.mensagem = 'A senha deve ter pelo menos 8 caracteres.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mensagem = 'As senhas não coincidem.';
      return;
    }

    const cadastrado = this.authService.cadastrar(
      this.nome.trim(),
      emailNormalizado,
      this.senha
    );

    if (!cadastrado) {
      this.mensagem = 'Este e-mail já está cadastrado.';
      return;
    }

    this.sucesso = true;
    this.mensagem = 'Cadastro realizado com sucesso!';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);

  }

}
