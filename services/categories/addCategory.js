const { Category } = require('../../models')

const addCategory = async (body, owner) => {
  try {
    const { type, name} = body
    const newCategory= new Category({ type, name, owner })
    await newCategory.save()
    return newCategory
  } catch (error) {
    throw error
  };
}

module.exports = addCategory
