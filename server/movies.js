const mongoose = require('mongoose');
const Movie = mongoose.model('Movie')
const Score = mongoose.model('Score')
const Director = mongoose.model('Director')
const Actor = mongoose.model('Actor')

module.exports = {

    getMoviesByDirectorOrActor: async(req, res, next) => {
        try{
            const id = req.body.id
            const moviesActors = await Movie.find({ actors: { "$in" : [id]} }).populate(['actors', 'directors', 'genres', 'score', 'country'])
            const moviesDirectors = await Movie.find({ directors: { "$in" : [id]} }).populate(['actors', 'directors', 'genres', 'score', 'country'])

            const director = await Director.findById(id)
            const actor = await Actor.findById(id)

            const result = {
                human: director ? director : actor,
                movies: moviesActors.concat(moviesDirectors)
            }
            res.status(200).send(result)
        }catch(error){
            res.status(400).send(error)
        }
    },

    all: async(req, res, next) => {
        try{
            const movies = await Movie.find().populate(['actors', 'directors', 'genres', 'score', 'country'])
            res.status(200).send(movies)
        }catch(error){
            res.status(400).send(error)
        }
    },

    add: async(req, res, next) => {
        try {
            const score = new Score(req.body.score)
            await score.save()
            req.body.score = score._id
            const movie = new Movie(req.body)
            await movie.save()
            res.status(201).send(movie)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async(req, res, next) => {
        try{
            await Movie.findByIdAndDelete(req.body.id)
            res.status(200).json({
                success: true
            })
        }catch(error){
            res.status(400).send(error)
        }
    }

}