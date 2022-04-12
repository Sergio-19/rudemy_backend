const Router = require('express')
const router = new Router()
const mailController = require('../controllers/mail.controller')

router.post('/rudemy', mailController.sendMail)



module.exports = router