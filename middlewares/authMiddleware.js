const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
      if (!authorization) {
      next(new Unauthorized('Please, provide a token in request authorization header'))
    }

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    throw new Unauthorized('Invalid token');
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized('Invalid token');
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401,
    next(error);
  }
};

module.exports = authMiddleware;


// // const jwt = require('jsonwebtoken')
// const { Unauthorized } = require('http-errors')
// // const { getUserById } = require('../services/users')

// const authMiddleware = async (req, res, next) => {
//   // try {
//   //   const { authorization } = req.headers
//   //   if (!authorization) {
//   //     next(new Unauthorized('Please, provide a token in request authorization header'))
//   //   }

//   //   const [, token] = authorization.split(' ')

//   //   if (!token) {
//   //     next(new Unauthorized('Please, provide a token'))
//   //   }

//   //   const decodedToken = jwt.decode(token, process.env.JWT_SECRET)
//   //   if (!decodedToken) {
//   //     next(new Unauthorized('Not authorized'))
//   //   }
//   //   const user = await getUserById(decodedToken.id)
//   //   if (user && user.token === token) {
//   //     req.user = user
//   //     next()
//   //   } else {
//   //     next(new Unauthorized('Not authorized'))
//   //   };
//   // } catch (err) {
//   //   next(new Unauthorized('Invalid token'))
//   // }
// }

// module.exports = authMiddleware


