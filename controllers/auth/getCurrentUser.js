const usersHendlers = require('../../services/users')
const { NotFound } = require('http-errors')

const getCurrentUser = async (req, res, next) => {
    const { user: { _id } } = req
    const user = await usersHendlers.getUserById(_id)
    if (user) {
    const {token, email, name, balance} = user 
        res.json({
            status: 'success',
            code: 200,
            data: {
                token,
                user: {
                    email,
                    name,
                    balance
                }
            }
        })
    } else {
        throw new NotFound(`User with id ${_id} not found`)
    }
};

module.exports = getCurrentUser
