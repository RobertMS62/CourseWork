const mongoose = require('mongoose');
const Country = mongoose.model('Country')

module.exports = {

    all: async(req, res, next) => {
        try{
            const countries = await Country.find()
            res.status(200).send(countries)
        }catch(error){
            res.status(400).send(error)
        }
    },

    add: async(req, res, next) => {
        try {
            const country = new Country(req.body)
            await country.save()
            res.status(201).send(country)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async(req, res, next) => {
        try{
            await Country.findByIdAndDelete(req.body.id)
            res.status(200).json({
                success: true
            })
        }catch(error){
            res.status(400).send(error)
        }
    }

}