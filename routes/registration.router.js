const Router = require('express')
const router = new Router()

const registrationController = require('../controllers/registration.controller')

router.post('/registration/validate', registrationController.emailValidate)
router.post('/registration/createnewuser', registrationController.createNewUser)




module.exports = router