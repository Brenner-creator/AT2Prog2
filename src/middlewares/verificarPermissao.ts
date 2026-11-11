import { Request, Response, NextFunction } from 'express';

export function verificarPermissao(...perfis: string[]) {
  return (req: Request, res: Response, next: NextFunction): any => {
    if (!req.usuario || !perfis.includes(req.usuario.perfil)) {
      return res.status(403).json({
        mensagem: "Acesso negado"
      });
    }
    next();
  };
}