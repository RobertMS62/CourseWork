const mongoose = require('mongoose');
const Director = mongoose.model('Director')

module.exports = {

    all: async(req, res, next) => {
        try{
            const directors = await Director.find()
            res.status(200).send(directors)
        }catch(error){
            res.status(400).send(error)
        }
    },

    add: async(req, res, next) => {
        try {
            const director = new Director(req.body)
            await director.save()
            res.status(201).send(director)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async(req, res, next) => {
        try{
            await Director.findByIdAndDelete(req.body.id)
            res.status(200).json({
                success: true
            })
        }catch(error){
            res.status(400).send(error)
        }
    }

}