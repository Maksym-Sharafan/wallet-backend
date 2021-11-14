const transactionsHandlers = require('../../services/transactions')

const getAll = async (req, res, next) => {
  const { _id } = req.user
  let { page = 1, limit = 5, month, year, category } = req.query
  page = Number(page)
  limit = Number(limit)
  month = Number(month)
  year = Number(year)
  const skip = (page - 1) * limit
  console.log( month, year)
  const transactionList = await transactionsHandlers.transactionList(_id, skip, limit, month, year, category)
  res.json({ transactionList })
};

module.exports = getAll
