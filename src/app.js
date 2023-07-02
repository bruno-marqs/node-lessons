import express from "express";

// atribuindo à variavel app uma instância express
const app = express();

// criando um array de livros
const livros = [
    {id: 1, "titulo": "O Senhor do Anéis"},
    {id: 2, "titulo": "O Hobbit"}
]

// criando rotas
app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
})

app.get('/livros', (req, res) => {
    res.status(200).json(livros)
})

export default app