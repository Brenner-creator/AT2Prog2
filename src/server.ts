import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes';

const app = express();
app.use(express.json());

app.use(usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor modular rodando na porta ${PORT}`);
});