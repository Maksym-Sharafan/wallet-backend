const express = require('express')
const router = express.Router()
const { tryCatchWrapper } = require('../../middlewares')
// const { authMiddleware } = require('../../middlewares')
const ctrl = require('../../controllers/categories')

// router.use(authMiddleware)

router.post('/', tryCatchWrapper(ctrl.addCategory))

router.get('/', tryCatchWrapper(ctrl.getAll))


module.exports = router
