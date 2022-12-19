const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    latitude: Number,
    longitude: Number
   
})

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location