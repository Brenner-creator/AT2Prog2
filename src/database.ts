export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senhaHash: string;
  perfil: 'Administrador' | 'Professor' | 'Aluno';
}

export const usuariosDB: Usuario[] = [];