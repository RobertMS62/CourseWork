
const mongoose = require('mongoose');
const User = mongoose.model('User')
const auth = require('../middleware/')


module.exports = {

    rergister: async(req, res, next) => {
        try {
            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    },

    login: async(req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                return res.status(401).send({error: 'Login failed'})
            }
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    },

    profile: async(req, res, next) => {
        req.user.password = ""
        res.send(req.user)
    }

}