import mongoose from "mongoose";

// criando o atributos do model livro
const livroSCHEMA = new mongoose.Schema(
    {
    id: {type: String},
    titulo: {type: String, required: true},
    autor: {type: String, required: true},
    editora: {type: String, required: true},
    numeroPaginas: {type: Number}
    }
);

const livros =  mongoose.model('livros', livroSCHEMA);

export default livros;