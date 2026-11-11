import { Router, Request, Response } from 'express';
import { usuarioController } from '../controllers/usuarioController';
import { autenticar } from '../middlewares/autenticar';
import { verificarPermissao } from '../middlewares/verificarPermissao';

const router = Router();


router.post('/usuarios/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);

router.get('/admin/dashboard', autenticar, verificarPermissao('Administrador'), (req: Request, res: Response) => {
  res.json({ mensagem: "Painel do Administrador acessado com sucesso" });
});

router.get('/professor/turmas', autenticar, verificarPermissao('Professor'), (req: Request, res: Response) => {
  res.json({ mensagem: "Lista de turmas do Professor acessada com sucesso" });
});

router.get('/aluno/boletim', autenticar, verificarPermissao('Aluno'), (req: Request, res: Response) => {
  res.json({ mensagem: "Boletim do Aluno acessado com sucesso" });
});

export default router;