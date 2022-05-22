const User = require('../models/User')

const mdAuth = {
    private: async (req, res, next) => {
        let {authorization : token} = req.headers
       
        if (!token) {
            return res.json({ notallowed: true })
        }

        const user = await User.findOne({token})

        if(!user){
            return res.json({ notallowed: true })
        }

        req.token = token;
        next()
    }
}


module.exports = mdAuth