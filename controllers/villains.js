const models = require('../models')
const getAllVillains = async (request, response) => {
  try {
    const villains = await models.villains
      .findAll({ attributes: ['name', 'movie', 'slug'] })

    return response.send(villains)
  } catch (error) {
    return response.status(500).send('Unable to retreive villains, try try again')
  }
}

const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const matchingVillains = await models.villains
      .findOne({
        attributes: ['name', 'movie', 'slug'],
        where: { slug: slug.toLowerCase() }
      })

    return matchingVillains
      ? response.send(matchingVillains)
      : response.sendStatus(404)
  }
  catch (error) {
    return response.status(500).send('Unable to retreive villains, try try again')
  }
}

const saveNewVillain = async (request, response) => {
  try {
    const {
      name, movie, slug
    } = request.body

    if (!name || !movie || !slug) {
      return response
        .status(400)
        .send('The following fields are required: name, movie, slug')
    }

    const newVillain = await models.villains.create({
      name, movie, slug
    })

    return response.status(201).send(newVillain)
  } catch (error) {
    return response.status(500).send('Unable to retreive villains, try try again')
  }
}

module.exports = { getAllVillains, getVillainBySlug, saveNewVillain }
