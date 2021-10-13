const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {
    jwtSecret
} = require('../config')

const auth = async (req, res, next) => {
    var token = ''
    if (req.header('Authorization')) {
        token = req.header('Authorization').replace('Bearer ', '')
    }

    if (token.length < 10){
        token = req.body.jwt
        delete req.body.jwt
    }

    try {
        const data = jwt.verify(token, jwtSecret)
        const user = await User.findOne({
            _id: data._id
        })

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token

        next()
    } catch (error) {
        res.status(401).send({
            error: 'Not authorized'
        })
    }
}

module.exports = auth