const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('./controllers/Villains')

const app = express()

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainBySlug)

app.post('/villains', bodyParser.json(), saveNewVillain)

app.listen(1337, () => {
  console.log('Don\'t be such an Ursula') // eslint-disable-line no-console
})
