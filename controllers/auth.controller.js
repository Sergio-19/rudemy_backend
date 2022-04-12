//  const db = require('../db')
const mysql = require('mysql')
 const jwt = require('jsonwebtoken')

 let secret = 'SECRET_KEY_RUDEMY'

//  const connection = mysql.createConnection({
//     // host: 'stended3.beget.tech',
//     // user: 'stended3_rudemy',
//     // password: 'Se549297',
//     // database: 'stended3_rudemy'

//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'rudemy_project'
// })

class AuthController {


    async registration(req, res){
        try{
          const {email, password, name, userId} = req.body
          

            const fullname = 'Не заполнено'
            const students = 0
            const courses = 0
            const photo = 'Ссылка на фото'
            const speciality = 'Не заполнено'
            const rating = 0
            const about = 'Не заполнено'

            const connection = await mysql.createConnection({
                host: 'stended3.beget.tech',
                user: 'stended3_rudemy',
                password: 'Se549297',
                database: 'stended3_rudemy'
            
                // host: 'localhost',
                // user: 'root',
                // password: 'root',
                // database: 'rudemy_project'
            })

            await connection.connect((error)=> {
                if(error){
                    return console.log('Ошибка подключения к базе данных!')
                } else {
                    return console.log('Подключение успешно')
                }
            })

          await connection.query(`SELECT * FROM student_user WHERE email LIKE '${email}'`, (error, result)=>{
           
            if(result.length > 0){
                return res.json({"message": 'Пользователь с таким email уже зарегистрирован'})
            }  })
            
            
           await  connection.query(`INSERT INTO student_user (name, email, password, userId, courseList) VALUES ('${name}', '${email}', '${password}', '${userId}', 'courses#')`, (error)=>{
            
                    })

                    await  connection.query(`INSERT INTO teacher_user (name, email, password, userId, fullname, students, courses, photo, speciality, rating, about, courseList) VALUES ('${name}', '${email}', '${password}', '${userId}', '${fullname}', '${students}', '${courses}', 
                    '${photo}', '${speciality}', '${rating}', '${about}', 'courses#')`, (error)=> {
                        if(error){console.log(error)}else{console.log('Карточка преподавателя создана')}
                    })

                    let token = 'eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJKb2huIEdvbGQiLCJhZG1pbiI6dHJ1ZX0K'
                      await  connection.query(`SELECT * FROM student_user WHERE email LIKE '${email}'`, (error, users)=> {
                            console.log('Учетная запись создана')
                         res.json({"message": 'Пользователь успешно зарегистрирован!', "token": token, 'userId': userId})   
                        })
     
            
       

        await connection.end((error)=> {
            if(error){
                console.log(`Ошибка ${error}`)
            } else {
                console.log('Подключение закрыто')
            }
        })

    }catch(e){console.log(e)}
        }

    async login(req, res){
        try{
            const {email, password} = req.body
            const connection = await mysql.createConnection({
                host: 'stended3.beget.tech',
                user: 'stended3_rudemy',
                password: 'Se549297',
                database: 'stended3_rudemy'
            
                // host: 'localhost',
                // user: 'root',
                // password: 'root',
                // database: 'rudemy_project'
            })

            await connection.connect((error)=> {
                if(error){
                    return console.log('Ошибка подключения к базе данных!')
                } else {
                    return console.log('Подключение успешно')
                }
            })
        await connection.query(`SELECT * FROM student_user WHERE email LIKE '${email}' AND password LIKE '${password}'`, (error, result)=> {
                if(result.length > 0){
                    let token = 'eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJKb2huIEdvbGQiLCJhZG1pbiI6dHJ1ZX0K'
                    res.json({"message": 'Пользователь авторизован', "token": token, 'user': result[0]})
                }else{
                    res.json({"message": 'Введён неверный email или пароль'})
                }
        })    
        await connection.end((error)=> {
            if(error){
                console.log(`Ошибка ${error}`)
            } else {
                console.log('Подключение закрыто')
            }
        })
            


        }catch(e){console.log(e)}
    }


    async teacherUpdate(req, res){
        try{
            const {fullname, students, courses, photo, speciality, rating, about, userId} = req.body

            const connection = await mysql.createConnection({
                host: 'stended3.beget.tech',
                user: 'stended3_rudemy',
                password: 'Se549297',
                database: 'stended3_rudemy'
            
                // host: 'localhost',
                // user: 'root',
                // password: 'root',
                // database: 'rudemy_project'
            })

            await connection.connect((error)=> {
                if(error){
                    return console.log('Ошибка подключения к базе данных!')
                } else {
                    return console.log('Подключение успешно')
                }
            })
           
            
            connection.query(`UPDATE teacher_user SET fullname = '${fullname}', students = '${students}', courses = '${courses}', photo = '${photo}',
            speciality = '${speciality}', rating = '${rating}', about = '${about}' WHERE userId LIKE '${userId}'`, (error, result)=>{
                if(error){
                    console.log(error)
                } else {
                    console.log(result)
                    res.json({"userId": userId, "message": "Карточка преподавателя успешно заполнена!"})
                }
            })
            await connection.end((error)=> {
                if(error){
                    console.log(`Ошибка ${error}`)
                } else {
                    console.log('Подключение закрыто')
                }
            })


        }catch(e){console.log(e)}
    }

    async getOneUser(req, res) {
        const userId = req.body.userId

        const connection = await mysql.createConnection({
            host: 'stended3.beget.tech',
            user: 'stended3_rudemy',
            password: 'Se549297',
            database: 'stended3_rudemy'
        
            // host: 'localhost',
            // user: 'root',
            // password: 'root',
            // database: 'rudemy_project'
        })

        await connection.connect((error)=> {
            if(error){
                return console.log('Ошибка подключения к базе данных!')
            } else {
                return console.log('Подключение успешно')
            }
        })

        connection.query(`SELECT * FROM student_user WHERE userId = '${userId}'`, (error, result)=> {
            if(error) {console.log(error)} else {
                if(result.length > 0){
                    res.json({"user": result[0]})
                } else {
                    res.json({'message': 'авторизуйтесь'})
                }
            }
        })
        await connection.end((error)=> {
            if(error){
                console.log(`Ошибка ${error}`)
            } else {
                console.log('Подключение закрыто')
            }
        })

    }



}

module.exports = new AuthController();