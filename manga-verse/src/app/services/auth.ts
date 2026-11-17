
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor() {

  const usuarios = this.listarUsuarios();

  const adminExiste = usuarios.some(
    usuario => usuario.email === 'admin@mangaverse.com'
  );

  if (!adminExiste) {

    usuarios.push({
      nome: 'Administrador',
      email: 'admin@mangaverse.com',
      senha: 'Admin123',
      tipo: 'admin'
    });

    localStorage.setItem(
      this.chaveUsuarios,
      JSON.stringify(usuarios)
    );

  }

}

  private chaveUsuarios = 'usuarios';
  private chaveSessao = 'usuarioLogado';

  listarUsuarios(): Usuario[] {

    const dados = localStorage.getItem(this.chaveUsuarios);

    return dados ? JSON.parse(dados) as Usuario[] : [];

  }

  cadastrar(
    nome: string,
    email: string,
    senha: string
  ): boolean {

    const usuarios = this.listarUsuarios();

    const emailExistente = usuarios.some(
      usuario => usuario.email === email
    );

    if (emailExistente) {
      return false;
    }

    const novoUsuario: Usuario = {
      nome: nome,
      email: email,
      senha: senha,
      tipo: 'cliente'
    };

    usuarios.push(novoUsuario);

    localStorage.setItem(
      this.chaveUsuarios,
      JSON.stringify(usuarios)
    );

    return true;
  }

  login(email: string, senha: string): boolean {

    const usuarios = this.listarUsuarios();

    const usuario = usuarios.find(
      usuario =>
        usuario.email === email &&
        usuario.senha === senha
    );

    if (!usuario) {
      return false;
    }

    localStorage.setItem(
      this.chaveSessao,
      JSON.stringify({
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
      })
    );

    return true;
  }

  obterUsuarioLogado(): Omit<Usuario, 'senha'> | null {

    const dados = localStorage.getItem(this.chaveSessao);

    return dados ? JSON.parse(dados) : null;
  }

  ehAdmin(): boolean {

    return this.obterUsuarioLogado()?.tipo === 'admin';
  }

  logout(): void {

    localStorage.removeItem(this.chaveSessao);

  }

}
