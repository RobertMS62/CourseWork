const mongoose = require('mongoose');
const Score = mongoose.model('Score')

module.exports = {

    all: async(req, res, next) => {
        try{
            const scores = await Score.find()
            res.status(200).send(scores)
        }catch(error){
            res.status(400).send(error)
        }
    },

    add: async(req, res, next) => {
        try {
            const score = new Score(req.body)
            await score.save()
            res.status(201).send(score)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async(req, res, next) => {
        try{
            await Score.findByIdAndDelete(req.body.id)
            res.status(200).json({
                success: true
            })
        }catch(error){
            res.status(400).send(error)
        }
    }

}