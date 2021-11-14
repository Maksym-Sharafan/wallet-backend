const express = require('express')
const router = express.Router()
const { tryCatchWrapper, authMiddleware } = require('../../middlewares')
const ctrl = require('../../controllers/transactions')

router.use(authMiddleware)

router.post('/', tryCatchWrapper(ctrl.addTransaction))
router.get('/', tryCatchWrapper(ctrl.getAll))

module.exports = router
