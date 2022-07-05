const mysql = require('mysql')

function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

class RegistrationController {

    //функция для валидации email при регистрации нового пользователя

    async emailValidate(req, res) {
        const {email, password, name, userId} = req.body

        if(validateEmail(email)){
            // res.json({"message": 'Валидный E-mail'})

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

          await connection.query(`SELECT * FROM student_user WHERE email = '${email}'`, (error, result)=>{
              if(error){
                  console.log(error)
              } else {
                 if(result.length > 0){
                    res.json({"message": 'Пользователь с таким email уже зарегистрирован', 'success': false})
            } else {
                res.json({"message": 'Пользователь с таким email не найден', 'success': true})
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
        } else {
            res.json({"message": 'Невалидный E-mail', 'success': false})
        }

    }


    //функция создания нового пользователя в системе если email прошёл валидацию

    async createNewUser(req, res) {
        const {email, password, name, userId} = req.body
        
            const fullname = req.body.fullname || 'Не заполнено'
            const students = req.body.students || 0
            const courses = req.body.courses || 0
            const photo =  req.body.photo || 'Ссылка на фото'
            const speciality =  req.body.speciality || 'Не заполнено'
            const rating = req.body.rating || 5
            const about = req.body.about || 'Не заполнено'

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
            
            await  connection.query(`INSERT INTO student_user (name, email, password, userId, courseList)
                                   VALUES ('${name}', '${email}', '${password}', '${userId}', 'courses')`, (error)=>{
                                  if(error) {
                                      console.log(error)
                                      res.json({"message": 'Ошибка при записи в таблицу student_user'})
                                  } else {console.log( 'Новый пользователь записан в таблицу student_user')} 
            })

            await  connection.query(`INSERT INTO teacher_user (name, email, password, userId, fullname, students, courses, photo, speciality, rating, about, courseList) VALUES ('${name}', '${email}', '${password}', '${userId}', '${fullname}', '${students}', '${courses}', 
            '${photo}', '${speciality}', '${rating}', '${about}', 'courses')`, (error)=> {
                if(error){console.log(error)
                          res.json({"message": 'Ошибка при записи в таблицу teacher_user', "success": false})  
                } else {console.log('Карточка преподавателя создана')
                res.json({"message": `Пользователь с E-mail - ${email} создан!`, "success": true})
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



module.exports = new RegistrationController();