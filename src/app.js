import express from "express";

// atribuindo à variavel app uma instância express
const app = express();

// criando interpretador json do Express
app.use(express.json())

// criando um array de livros
const livros = [
    {id: 1, "titulo": "O Senhor do Anéis"},
    {id: 2, "titulo": "O Hobbit"}
]

// criando método GETT
app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
})
app.get('/livros', (req, res) => {
    res.status(200).json(livros)
})

app.get('/livros/:id', (req, res) => {
    let index = buscaLivro(req.param.id);
    res.json(livros[index]);
})

// criando método POST 
app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro foi cadastrado com sucesso')
})

// criando método PUT
app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.param.id);
    livros[index].titulo = req.body.titulo;
    res.json(livros);
})

// criando função para buscar livro por id
function buscaLivro(id){
    return livros.findIndex(livro => livro.id == id)
}

export default app