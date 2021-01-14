const express = require('express')
const mongoose = require('mongoose')

const app = express()
require('dotenv').config()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.static('public'))

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('error', (err) => {
  console.log(
    err.message,
    'is Mongod not running?/Problem with Atlas Connection'
  );
})
mongoose.connection.on('connected', () => {
  console.log('mongo connected');
})
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

app.listen(PORT, () => {
  console.log("listening on port", PORT);
})


const animalsController = require('./controllers/animals.js')
app.use('/animals', animalsController)
