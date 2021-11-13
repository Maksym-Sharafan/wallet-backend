const categoriesHendlers = require('../../services/categories')

const getAll = async (req, res, next) => {
      // заменить после авторизации
  // const { _id } = req.user
  // const categoriesList = await categoriesHendlers.categoriesList(_id)
  const categoriesList = await categoriesHendlers.categoriesList()
  res.json({ categoriesList })
};

module.exports = getAll
