const mongoose = require('mongoose');
const Genre = mongoose.model('Genre')

module.exports = {

    all: async(req, res, next) => {
        try{
            const genres = await Genre.find()
            res.status(200).send(genres)
        }catch(error){
            res.status(400).send(error)
        }
    },

    add: async(req, res, next) => {
        try {
            const genre = new Genre(req.body)
            await genre.save()
            res.status(201).send(genre)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async(req, res, next) => {
        try{
            await Genre.findByIdAndDelete(req.body.id)
            res.status(200).json({
                success: true
            })
        }catch(error){
            res.status(400).send(error)
        }
    }

}