import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/Livro.js";
import routes from "./routes/index.js";

// criando a conexão
db.on("error", console.log.bind(console, 'Erro de Conexão'))
// abrindo conexão
db.once("open", () => {
    console.log("Conexão com o Banco feita com sucesso")
})

// atribuindo à variavel app uma instância express
const app = express();

// criando interpretador json do Express
app.use(express.json());

// instanciando rotas
routes(app);

// criando um array de livros
// const livros = [
//     {id: 1, "titulo": "O Senhor do Anéis"},
//     {id: 2, "titulo": "O Hobbit"}
// ]

// criando método GET
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

// criando método DELETE
app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    // metodo splice (delete) a partir do index, apenas 1 elemento
    livros.splice(index, 1)
    res.send(`Livro ${id} removido com sucesso`);
})

// criando função para buscar livro por id
function buscaLivro(id){
    return livros.findIndex(livro => livro.id == id)
}

export default app