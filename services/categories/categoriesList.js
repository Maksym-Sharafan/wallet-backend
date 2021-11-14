const { Category } = require('../../models')

const categoriesList = async (userId) => {
  try {
    const categoriesList = await Category.find({$or:[{owner: userId},{owner: null}]})
    return categoriesList
  } catch (error) {
    throw error
  }
}

module.exports = categoriesList

