const mongoose = require('mongoose')

const actorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: String,
        required: true,
        trim: true
    },
    picture: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    }
})

const Actor = mongoose.model('Actor', actorSchema)

module.exports = Actor