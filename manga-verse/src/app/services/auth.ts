import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';

type UsuarioArmazenado = Usuario & { senha: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly chaveUsuarios = 'mangaverseUsuarios';
  private readonly chaveSessao = 'usuarioLogado';
  private readonly chaveAdmin = 'mangaverseAdminAuth';
  // Credenciais de demonstração: altere no código antes de apresentar o projeto.
  private readonly adminEmail = 'admin@mangaverse.com';
  private readonly adminSenha = 'Admin123!';

  constructor() { this.inicializar(); }

  private inicializar(): void {
    if (localStorage.getItem(this.chaveUsuarios) === null) {
      localStorage.setItem(this.chaveUsuarios, JSON.stringify([]));
    }
  }

  private usuarios(): UsuarioArmazenado[] {
    return JSON.parse(localStorage.getItem(this.chaveUsuarios) || '[]') as UsuarioArmazenado[];
  }

  private salvarUsuarios(lista: UsuarioArmazenado[]): void {
    localStorage.setItem(this.chaveUsuarios, JSON.stringify(lista));
  }

  login(email: string, senha: string): Observable<boolean> {
    const normalizado = email.trim().toLowerCase();
    if (normalizado === this.adminEmail && senha === this.adminSenha) {
      localStorage.setItem(this.chaveAdmin, 'true');
      localStorage.setItem(this.chaveSessao, JSON.stringify({ nome: 'Administrador', email: this.adminEmail, tipo: 'admin' }));
      return of(true);
    }
    const usuario = this.usuarios().find(u => u.email.toLowerCase() === normalizado && u.senha === senha);
    if (!usuario) return throwError(() => new Error('E-mail ou senha incorretos.'));
    const { senha: _senha, ...dadosPublicos } = usuario;
    localStorage.removeItem(this.chaveAdmin);
    localStorage.setItem(this.chaveSessao, JSON.stringify({ ...dadosPublicos, tipo: 'cliente' }));
    return of(true);
  }

  cadastrar(nome: string, email: string, senha: string, documento = ''): Observable<boolean> {
    const normalizado = email.trim().toLowerCase();
    if (normalizado === this.adminEmail || this.usuarios().some(u => u.email.toLowerCase() === normalizado)) {
      return throwError(() => ({ status: 409, message: 'Este e-mail já está cadastrado.' }));
    }
    const lista = this.usuarios();
    const codigo = lista.reduce((maior, u) => Math.max(maior, u.codigo ?? 0), 0) + 1;
    lista.push({ codigo, nome: nome.trim(), email: normalizado, documento, senha, tipo: 'cliente' });
    this.salvarUsuarios(lista);
    return of(true);
  }

  obterUsuarioLogado(): Usuario | null {
    const dados = localStorage.getItem(this.chaveSessao);
    if (!dados) return null;
    try { return JSON.parse(dados) as Usuario; } catch { return null; }
  }

  ehAdmin(): boolean { return this.obterUsuarioLogado()?.tipo === 'admin' && localStorage.getItem(this.chaveAdmin) === 'true'; }

  listarClientes(): Usuario[] {
    return this.usuarios().map(({ senha: _senha, ...u }) => u).filter(u => u.tipo !== 'admin');
  }

  atualizarCliente(codigo: number, dados: Partial<Usuario>): Observable<string> {
    const lista = this.usuarios(); const i = lista.findIndex(u => u.codigo === codigo);
    if (i < 0) return throwError(() => new Error('Cliente não encontrado.'));
    if (dados.email && lista.some(u => u.codigo !== codigo && u.email.toLowerCase() === dados.email!.toLowerCase())) return throwError(() => new Error('E-mail já utilizado.'));
    lista[i] = { ...lista[i], nome: dados.nome?.trim() ?? lista[i].nome, email: dados.email?.trim().toLowerCase() ?? lista[i].email, documento: dados.documento ?? lista[i].documento };
    this.salvarUsuarios(lista); return of('Cadastro atualizado.');
  }

  excluirCliente(codigo: number): Observable<string> {
    this.salvarUsuarios(this.usuarios().filter(u => u.codigo !== codigo));
    return of('Cliente excluído.');
  }

  alterarSenhaCliente(codigo: number, senha: string): Observable<string> {
    const lista = this.usuarios(); const u = lista.find(x => x.codigo === codigo);
    if (!u) return throwError(() => new Error('Cliente não encontrado.'));
    if (senha.length < 8) return throwError(() => new Error('A senha deve ter pelo menos 8 caracteres.'));
    u.senha = senha; this.salvarUsuarios(lista); return of('Senha alterada.');
  }

  logout(): void { localStorage.removeItem(this.chaveSessao); localStorage.removeItem(this.chaveAdmin); }
}
