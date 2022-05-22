const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const State = require('../models/State')

const Auth = {
    signin: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.json({ error: errors.mapped() })
        }

        const data = matchedData(req)

        const user = await User.findOne({ email: data.email })

        if (!user) {
            return res.json({ error: "Email ou senha inválido!" })
        }

        const verifyPassword = await bcrypt.compare(data.password, user.passwordHash)

        if (!verifyPassword) {
            return res.json({ error: "Email ou senha inválido!" })
        }

        const token = await gerarToken();

        user.token = token

        await user.save()

        res.json({ token })

    },
    signup: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.json({ error: errors.mapped() })
        }

        const data = matchedData(req)

        const user = await User.findOne({
            email: data.email
        })

        if (user) {
            return res.json({
                error: { email: { msg: 'E-mail já existe!' } }
            })
        }


        const userState = await State.findById(data.state)

        if (!userState) {
            return res.json({
                error: { state: { msg: 'state não encontrado!' } }
            })
        }

        const passwordHash = await bcrypt.hash(data.password, 10)


        const token = await gerarToken();

        const newUser = new User({
            name: data.name,
            email: data.email,
            state: data.state,
            passwordHash,
            token,
        })

        await newUser.save()

        res.json({ token })
    }
}

const gerarToken = async () => {
    const payload = (Date.now() + Math.random()).toString();
    return await bcrypt.hash(payload, 10)
}


module.exports = Auth;