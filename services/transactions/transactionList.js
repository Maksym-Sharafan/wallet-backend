const { Transaction } = require('../../models')

const transactionList = async (userId, skip, limit, month, year) => {
  try {
// отбор по периоду добавить
    const transactionList = await Transaction.find({ owner: userId }).skip(skip).limit(limit)
    return transactionList
  } catch (error) {
    throw error
  }
}

module.exports = transactionList
