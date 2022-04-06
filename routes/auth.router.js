const Router = require('express')
const authController = require('../controllers/auth.controller')
const router = new Router()


router.post('/registration', authController.registration)

router.post('/login', authController.login)

router.post('/person/update', authController.teacherUpdate)
router.post('/person/user', authController.getOneUser)

module.exports = router;