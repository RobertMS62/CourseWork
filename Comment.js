const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment