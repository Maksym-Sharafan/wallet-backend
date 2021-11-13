const { Transaction } = require('../../models')

const addTransaction = async (body, owner) => {
  try {
    const { type, category, amount, date, comment } = body
    const newTransaction= new Transaction({ type, category, amount, date, comment, owner })
    await newTransaction.save()
    return newTransaction
  } catch (error) {
    throw error
  };
}

module.exports = addTransaction
