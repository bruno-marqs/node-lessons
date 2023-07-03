import express from "express";
import LivroController from "../controllers/livrosController.js";

// atribui variavel
const router = express.Router();

// cria rota de requisição
router
  .get("/livros", LivroController.listarLivros)
  .get("/livros/:id", LivroController.listarLivrosPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro)

export default router;