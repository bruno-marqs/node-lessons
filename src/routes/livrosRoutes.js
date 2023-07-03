import express from "express";
import LivroController from "../controlllers/livrosController.js";

// atribui variavel
const router = express.Router();

// cria rota de requisição
router
  .get("./livros", LivroController.listarLivros())

export default router;