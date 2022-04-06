const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router')
const courseRouter = require('./routes/course.router')



const PORT = process.env.PORT || 5000;

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api', userRouter)

app.use('/auth', authRouter)

app.use('/course', courseRouter)




app.listen(PORT, ()=> console.log(`Server started on  port ${PORT}...`))