const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }],
    directors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director'
    }],
    description: {
        type: String,
        required: true,
        trim: true
    },
    picture: {
        type: String,
        required: true
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    score: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score'
    },
    releaseDate: {
        type: String,
        required: true,
        trim: true
    },
    releaseDateRussia: {
        type: String,
        required: true,
        trim: true
    },
    money: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    ageLimit: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    budget: {
        type: String,
        required: true,
        trim: true
    },
    trailer: {
        type: String,
        required: true,
        trim: true
    }
    
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie