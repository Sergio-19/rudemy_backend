const Router = require('express')
const router = new Router()
const authAdminController = require('../controllers/auth.admin.controller')

router.post('/login', authAdminController.adminLogin)




module.exports = router