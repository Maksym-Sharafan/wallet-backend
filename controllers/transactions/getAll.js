const transactionsHandlers = require('../../services/transactions')

const getAll = async (req, res, next) => {
  const { _id } = req.user
  let { month, year, category } = req.query
  // month = Number(month)
  // year = Number(year)
  // console.log(typeof month, typeof year)
  const transactionList = await transactionsHandlers.transactionList(_id, month, year, category)
  res.json({ transactionList })
};

module.exports = getAll
