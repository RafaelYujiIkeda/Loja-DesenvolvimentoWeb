export interface Usuario {
  codigo?: number;
  nome: string;
  email: string;
  documento?: string;
  tipo: 'cliente' | 'admin';
}
