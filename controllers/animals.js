const express = require('express')
const animals = express.Router()
Animal = require('../models/animal.js')
animalSeed = require('../models/animal_seed.js')

animals.get('/animalseed', (req, res) => {
  Animal.insertMany(animalSeed, (err, animals) => {
    res.json(animals)
  })
})

animals.get('/closeshelter', (req, res) => {
  Animal.collection.drop()
  res.redirect('/animals')
})

animals.get('/', (req, res) => {
  Animal.find({}, (err, foundAnimals) => {
    res.json(foundAnimals)
  })
})

animals.post('/', (req, res) => {
  Animal.create(req.body, (err, createdAnimal) => {
    Animal.find({}, (err, foundAnimals) => {
      res.json(foundAnimals)
    })
  })
})

animals.put('/:id', (req, res) => {
  Animal.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateAnimal) => {
    if(err) {
      res.send(err)
    } else {
      Animal.find({}, (err, foundAnimals) => {
        res.json(foundAnimals)
      })
    }
  })
})

animals.put('/reservation/:id', (req, res) => {
  Animal.findById(req.params.id, (err, foundAnimal) => {
    if (foundAnimal.reservedForAdoption === false) {
      foundAnimal.reservedForAdoption = true
      foundAnimal.save((err, data) => {
        Animal.find({}, (err, foundAnimals) => {
          res.json(foundAnimals)
        })
      })
    } else {
      foundAnimal.reservedForAdoption = false
      foundAnimal.save((err, data) => {
        Animal.find({}, (err, foundAnimals) => {
          res.json(foundAnimals)
        })
    })
    }
  })
})

animals.delete('/:id', (req, res) => {
  Animal.findByIdAndRemove(req.params.id, (err, deletedAnimal) => {
    Animal.find({}, (err, foundAnimals) => {
      res.json(foundAnimals)
    })
  })
})




module.exports = animals
