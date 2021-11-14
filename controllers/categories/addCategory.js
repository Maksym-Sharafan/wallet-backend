const categoriesHandlers = require('../../services/categories')
const Joi = require('joi')
const { BadRequest } = require('http-errors')

const joiSchema = Joi.object({
  type: Joi.string().valid('income', 'cost').required(),
  name: Joi.string().required(),
  owner: Joi.string()
})

const addCategory = async (req, res) => {
  const { body, user } = req
  const { error } = joiSchema.validate(body)
  if (error) {
    throw new BadRequest(` ${error.message}.`)
  }
  res.status(201).json(await categoriesHandlers.addCategory(body, user._id));
}

module.exports = addCategory
