const mongoose = require('mongoose');
const Actor = mongoose.model('Actor')

module.exports = {

    all: async(req, res, next) => {
        try{
            const actors = await Actor.find()
            res.status(200).send(actors)
        }catch(error){
            res.status(400).send(error)
        }
    },

    add: async(req, res, next) => {
        try {
            const actor = new Actor(req.body)
            await actor.save()
            res.status(201).send(actor)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async(req, res, next) => {
        try{
            await Actor.findByIdAndDelete(req.body.id)
            res.status(200).json({
                success: true
            })
        }catch(error){
            res.status(400).send(error)
        }
    }

}