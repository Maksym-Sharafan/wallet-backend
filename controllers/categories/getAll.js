const categoriesHandlers = require('../../services/categories')

const getAll = async (req, res, next) => {
  const { _id } = req.user
  const categoriesList = await categoriesHandlers.categoriesList(_id)
  res.json({ categoriesList })
};

module.exports = getAll
