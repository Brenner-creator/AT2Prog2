export {};

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        nome: string;
        email: string;
        perfil: 'Administrador' | 'Professor' | 'Aluno';
      };
    }
  }
}