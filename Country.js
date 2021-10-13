const mongoose = require('mongoose')

const countrySchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    }
})

const Country = mongoose.model('Country', countrySchema)

module.exports = Country