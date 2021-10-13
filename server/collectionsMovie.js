const mongoose = require('mongoose');
const CollectionsMovie = mongoose.model('CollectionsMovie')

module.exports = {

    all: async(req, res, next) => {
        try{
            const collectionsMovies = await CollectionsMovie.find().populate({
                path: "movies",
                populate: {
                   path: "actors directors genres score country"
                }
             })
            res.status(200).send(collectionsMovies)
        }catch(error){
            res.status(400).send(error)
        }
    },

    add: async(req, res, next) => {
        try {
            const collectionsMovie = new CollectionsMovie(req.body)
            await collectionsMovie.save()
            res.status(201).send(collectionsMovie)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async(req, res, next) => {
        try{
            await CollectionsMovie.findByIdAndDelete(req.body.id)
            res.status(200).json({
                success: true
            })
        }catch(error){
            res.status(400).send(error)
        }
    }

}