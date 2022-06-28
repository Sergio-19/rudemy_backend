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

    //Регистрация
    async registration(req, res){
        try{
          const {email, password, name, userId} = req.body
          

            const fullname = req.body.fullname || 'Не заполнено'
            const students = req.body.students || 0
            const courses = req.body.courses || 0
            const photo =  req.body.photo || 'Ссылка на фото'
            const speciality =  req.body.speciality || 'Не заполнено'
            const rating = req.body.rating || 5
            const about = req.body.about || 'Не заполнено'

            const connection = await mysql.createConnection({
                // host: 'stended3.beget.tech',
                // user: 'stended3_rudemy',
                // password: 'Se549297',
                // database: 'stended3_rudemy'
            
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'rudemy_project'
            })

            await connection.connect((error)=> {
                if(error){
                    return console.log('Ошибка подключения к базе данных!')
                } else {
                    return console.log('Подключение успешно')
                }
            })

          await connection.query(`SELECT * FROM student_user WHERE email LIKE '${email}'`, (error, result)=>{
              if(error){
                  console.log(error)
              } else {
                 if(result.length > 0){
                
                return res.json({"message": 'Пользователь с таким email уже зарегистрирован'})
            }  
              }
           
             })
            
            
           await  connection.query(`INSERT INTO student_user (name, email, password, userId, courseList) VALUES ('${name}', '${email}', '${password}', '${userId}', 'courses')`, (error)=>{
            
                    })

                    await  connection.query(`INSERT INTO teacher_user (name, email, password, userId, fullname, students, courses, photo, speciality, rating, about, courseList) VALUES ('${name}', '${email}', '${password}', '${userId}', '${fullname}', '${students}', '${courses}', 
                    '${photo}', '${speciality}', '${rating}', '${about}', 'courses')`, (error)=> {
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


        //Вход в систему (для пользователей)
    async login(req, res){
        try{
            const {email, password} = req.body
            const connection = await mysql.createConnection({
                // host: 'stended3.beget.tech',
                // user: 'stended3_rudemy',
                // password: 'Se549297',
                // database: 'stended3_rudemy'
            
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'rudemy_project'
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


    //Получение всех преподавателей
    async getAllTeachers(req, res){
        const connection = await mysql.createConnection({
            // host: 'stended3.beget.tech',
            // user: 'stended3_rudemy',
            // password: 'Se549297',
            // database: 'stended3_rudemy'
        
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'rudemy_project'
        })

        await connection.connect((error)=> {
            if(error){
                return console.log('Ошибка подключения к базе данных!')
            } else {
                return console.log('Подключение успешно')
            }
        })

        await connection.query(`SELECT * FROM teacher_user`, (error, result)=> {
            if(error){
                console.log(error)
            } else {
                res.json({"teachers": result})
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


    //Изменение карточки преподавателя
    async teacherUpdate(req, res){
        try{
            const {fullname, students, courses, photo, speciality, rating, about, userId, id, name, email, password, courseList} = req.body.teacher

            const connection = await mysql.createConnection({
                // host: 'stended3.beget.tech',
                // user: 'stended3_rudemy',
                // password: 'Se549297',
                // database: 'stended3_rudemy'
            
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'rudemy_project'
            })

            await connection.connect((error)=> {
                if(error){
                    return console.log('Ошибка подключения к базе данных!')
                } else {
                    return console.log('Подключение успешно')
                }
            })
    
           
         
            connection.query(`UPDATE teacher_user SET fullname = '${fullname}', students = '${students}', courses = '${courses}', photo = '${photo}',
            speciality = '${speciality}', rating = '${rating}', about = '${about}', id = '${id}', name = '${name}', email = '${email}',
            password = '${password}', userId = '${userId}', courseList = '${courseList}' WHERE userId LIKE '${userId}'`, (error, result)=>{
                if(error){
                    console.log(error)
                    res.json({"message": 'Ошибка при редактировании карточки преподавателя', "success": false})
                } else {
                    console.log(req.body.teacher)
                    console.log("Карточка преподавателя успешно отредактирована!")
                    res.json({"teacher": req.body.teacher, "message": "Карточка преподавателя успешно отредактирована!", "success": true})
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
            // host: 'stended3.beget.tech',
            // user: 'stended3_rudemy',
            // password: 'Se549297',
            // database: 'stended3_rudemy'
        
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'rudemy_project'
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