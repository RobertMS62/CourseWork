const mongoose = require('mongoose')

const genreSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    }
})

const Genre = mongoose.model('Genre', genreSchema)

module.exports = Genre