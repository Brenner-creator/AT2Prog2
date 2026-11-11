import { Request, Response, NextFunction } from 'express';
import { usuariosDB } from '../database';

export function autenticar(req: Request, res: Response, next: NextFunction): any {
  const emailHeader = req.headers['x-user-email'] as string;

  if (!emailHeader) {
    return res.status(401).json({ mensagem: "Não autenticado" });
  }

  const usuario = usuariosDB.find(u => u.email === emailHeader);
  if (!usuario) {
    return res.status(401).json({ mensagem: "Usuário não encontrado" });
  }

  req.usuario = usuario;
  next();
}