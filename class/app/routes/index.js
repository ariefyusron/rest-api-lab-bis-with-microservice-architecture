const express = require('express')
const router = express.Router()

const controller = require('../controllers/class')
const middleware = require('../middlewares/auth')

router.get('/class', middleware.checkAuth, controller.index)
router.post('/class', [middleware.checkAuth, middleware.validasiStoreClass], controller.store)
router.post('/class/join/:idClassForJoin', middleware.checkAuth, controller.join)
router.delete('/class/leave/:idClassForJoin', middleware.checkAuth, controller.leave)

module.exports = router