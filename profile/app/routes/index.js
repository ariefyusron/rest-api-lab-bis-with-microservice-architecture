const express = require('express')
const router = express.Router()

const controller = require('../controllers/auth')
const middleware = require('../middlewares/auth')

router.get('/profile', middleware.register, controller.register)

module.exports = router