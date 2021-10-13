const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
    imdb: {
        type: Number,
        required: true
    },
    kinopoisk: {
        type: Number,
        required: true
    }
})

const Score = mongoose.model('Score', scoreSchema)

module.exports = Score