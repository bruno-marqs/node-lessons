// importando (com require) os modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// criando estrategia local de autenticacao
passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            const usuario = await Usuario.buscaPorEmail(email);
            verificaUsuario(usuario);
            await verificaSenha(senha, usuario.senhaHash)

            done(null, usuario);
        } catch (erro) {
            done(erro)
        }

    })
)

// criando estrategia para bearer (portador) do token
passport.use(
    new BearerStrategy(
        //criando função verificação
        async (token, done) => {
            // encapsulando no try-catch
            try {
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                const usuario = await Usuario.buscaPorId(payload.id);
                //retorno
                done(null, usuario)
            } catch (erro) {
                done(erro);
            }

        }
    )
)