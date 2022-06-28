const Router = require('express')
const studentController = require('../controllers/student.controller')
const router = new Router()

router.get('/allstudents', studentController.getAllStudents)





module.exports = router;