import app from './src/app.js'

// criando porta 
const port = process.end.PORT || 3000;



app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
})