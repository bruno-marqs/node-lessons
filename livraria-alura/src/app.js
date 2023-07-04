import express from "express";
import db from "./config/dbConnect.js";
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

export default app