const transactionsHandlers = require('../../services/transactions')
const Joi = require('joi')
const { BadRequest } = require('http-errors')

const joiSchema = Joi.object({
  type: Joi.string().valid('income', 'cost').required(),
  category: Joi.string(), // проверка на обязательность наличия при типе cost
  amount: Joi.number().min(0).required(),
  date: Joi.date().required(),
  comment: Joi.string(),
  owner: Joi.string()
})

const addTransaction = async (req, res) => {
  const { body, user } = req
  const { error } = joiSchema.validate(body)
  if (error) {
    throw new BadRequest(` ${error.message}.`)
  }
  res.status(201).json(await transactionsHandlers.addTransaction(body, user._id));
}

module.exports = addTransaction
