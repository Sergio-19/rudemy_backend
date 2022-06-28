const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const authRouter = require('./routes/auth.router')
const courseRouter = require('./routes/course.router')
const registrationRouter = require('./routes/registration.router')
const studentRouter = require('./routes/student.router')




const PORT = process.env.PORT || 5000;

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



app.use('/auth', authRouter)

app.use('/course', courseRouter)

app.use('/registration', registrationRouter)

app.use('/students', studentRouter)






app.listen(PORT, ()=> console.log(`Server started on  port ${PORT}...`))