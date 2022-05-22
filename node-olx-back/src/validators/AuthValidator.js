const { checkSchema } = require('express-validator')

const AuthValidator = {
    signup: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Nome de usuário precisa ter pelo menos 2 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "E-mail enviado não é válido"
        },
        password: {
            isLength: {
                options: { min: 6 }
            },
            errorMessage: "password precisa ser maior que 6 caracteres"
        },
        state: {
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "State precisa ter no minimo 2 caracteres"
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "E-mail enviado não é válido"
        },
        password: {
            isLength: {
                options: { min: 6 }
            },
            errorMessage: "password precisa ser maior que 6 caracteres"
        }
    })
}


module.exports = AuthValidator