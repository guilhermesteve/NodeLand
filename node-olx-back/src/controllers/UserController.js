const { validationResult, matchedData } = require('express-validator')
const State = require('../models/State')
const User = require('../models/User')
const Category = require('../models/Category')
const Ad = require('../models/Ad')
const { update } = require('../models/User')

const UserController = {
    getStates: async (req, res) => {
        let states = await State.find()

        res.json({
            states
        })
    },
    info: async (req, res) => {
        let token = req.token

        const user = await User.findOne({ token })
        const state = await State.findById(user.state)
        const ads = await Ad.find({ idUser: user._id.toString() })

        let adList = [];
        for (let i in ads) {

            let cat = await Category.findById(ads[i].category)
            adList.push({ ...ads[i], category: cat.name })
        }
        return res.json({
            name: user.name,
            email: user.email,
            state: state.name,
            ads: adList
        })
    },
    editAction: async (req, res) => {
        let token = req.token

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.json({ error: errors.mapped() })
        }

        const data = matchedData(req)

        let updates = {}

        if (data.name) {
            updates.name = data.name
        }

        if (data.email) {

            const user = await User.findOne({ email: data.email })
            if (!user && user.token !== token) {
                return res.json({ error: "E-mail já cadastrado" })
            }
            updates.email = data.email
        }

        if (data.password) {
            updates.passwordHash = data.password
        }

        if (data.state) {
            const stateCheck = await State.findById(data.state)

            if (!stateCheck) {
                return res.json({ error: "Estado não existe" })
            }

            updates.state = data.state
        }

      

        await User.findOneAndUpdate({ token: token }, { $set: updates })

        res.json({ updated: updates })
    }
}


module.exports = UserController;