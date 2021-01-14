const mongoose = require('mongoose')

const animalSchema = mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  image: {type:String, default: 'https://i.imgur.com/S9Z4ON3l.jpg'},
  description: String,
  reservedForAdoption: {type:Boolean, default:false}
})


const Animal = mongoose.model('Animal', animalSchema)

module.exports = Animal
