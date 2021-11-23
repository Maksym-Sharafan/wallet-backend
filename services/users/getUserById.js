const { User } = require('../../models/user')

const getUserById = async (id) => {
  const user = await User.findOne({ _id: id })
  if (user) {
    return user
  } else {
    return false
  }
}

module.exports = getUserById
