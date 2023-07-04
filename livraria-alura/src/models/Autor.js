import mongoose from "mongoose";

// criando o atributos do model livro
const autorSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        nacionalidade: {type: String}
    },
    {
        versionKey: false
    }
)

const autores = mongoose.model("autores", autorSchema)

export default autores;