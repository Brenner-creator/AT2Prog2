import { Request, Response } from 'express';
import { usuariosDB, Usuario } from '../database';

function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const usuarioController = {
  cadastrar(req: Request, res: Response): any {
    const { nome, email, senha, perfil } = req.body;

    if (!nome || !email || !senha || !perfil) {
      return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ mensagem: "E-mail em formato inválido" });
    }

    if (senha.length < 6) {
      return res.status(400).json({ mensagem: "A senha deve ter no mínimo 6 caracteres" });
    }

    const perfisValidos = ['Administrador', 'Professor', 'Aluno'];
    if (!perfisValidos.includes(perfil)) {
      return res.status(400).json({ mensagem: "Perfil inválido" });
    }

    const emailExistente = usuariosDB.find(u => u.email === email);
    if (emailExistente) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado" });
    }

    const novoUsuario: Usuario = {
      id: usuariosDB.length + 1,
      nome,
      email,
      senhaHash: senha,
      perfil
    };

    usuariosDB.push(novoUsuario);

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      usuario: { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email, perfil: novoUsuario.perfil }
    });
  },

  login(req: Request, res: Response): any {
    const { email, senha } = req.body;

    const usuario = usuariosDB.find(u => u.email === email && u.senhaHash === senha);
    if (!usuario) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    return res.json({
      mensagem: "Login efetuado com sucesso",
      usuario: { id: usuario.id, email: usuario.email, perfil: usuario.perfil }
    });
  }
};