const express = require('express');

const { tryCatchWrapper, validation, authMiddleware } = require('../../middlewares');
const { joiSchema } = require('../../models/user');
const { auth: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', validation(joiSchema), tryCatchWrapper(ctrl.signup));

router.post('/login', validation(joiSchema), tryCatchWrapper(ctrl.login));

router.get('/logout', authMiddleware, tryCatchWrapper(ctrl.logout));

module.exports = router;