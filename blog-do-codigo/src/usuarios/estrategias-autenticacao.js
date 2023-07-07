// importando (com require) os modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// importando modelo Usuario
const Usuario = require('./usuarios-modelo')

//importando tratamento de erro
const { InvalidArgumentError } = require('../erros');


// função para validar se usuario existe
function verificaUsuario(usuario) {
    if(!usuario) {
        throw new InvalidArgumentError('Não existe usuário com esse e-mail');
    }
}

// funcao para validar a senhaHash com a senha inserida
async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if(!senhaValida) {
        throw new InvalidArgumentError('Email ou senha inválidos')
    }
}

// criando estrategia de autenticacao
passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            const usuario = await Usuario.buscaPorEmail(email);
            verificaUsuario(usuario);
            verificaSenha(senha, usuario.senhaHash)

            done(null, usuario);
        } catch (erro) {
            done(erro)
        }

    })
)