const Router = require('express')

const router = new Router()
const courseController = require('../controllers/course.controller')


router.post('/createcourse', courseController.createCourse)

router.post('/allcourses', courseController.getCourses)

router.get('/getallcourses', courseController.getAllCourses)

router.post('/teacher', courseController.getTeacher)

router.post('/getcourse', courseController.getOneCourse)

router.post('/getlessons', courseController.getLessons)

router.post('/createlesson', courseController.createLesson)

router.post('/search', courseController.searchCourses)

router.post('/addcourse', courseController.addCourse)

router.post('/updatecourse', courseController.updateCourse)

router.post('/deletecourse', courseController.deleteCourse)


module.exports = router