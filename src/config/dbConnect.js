import mongoose from "mongoose"

mongoose.connect("mongodb+srv://marques:123@cluster0.tvylhw1.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;