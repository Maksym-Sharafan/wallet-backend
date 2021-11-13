const { Category } = require('../../models')

const categoriesList = async (userId) => {
  try {
    // заменить после авторизации
    const categoriesList = await Category.find({})
    // const categoriesList = await Category.find({$or:[{owner: userId},{owner: null}]})
    return categoriesList
  } catch (error) {
    throw error
  }
}

module.exports = categoriesList

