    // const db = require('../db')

    const mysql = require('mysql')

// const connection = mysql.createConnection({
    // host: 'stended3.beget.tech',
    // user: 'stended3_rudemy',
    // password: 'Se549297',
    // database: 'stended3_rudemy'

//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'rudemy_project'
// })




class CourseController {

  async  createCourse(req, res) {
        const {logo, fullname, shortDescription, rating, authorId, language, creationDate, price, oldPrice, students, skills, knowledge, description, courseId, category, subCategory, topics, author, mock, reviews} = req.body

        const connection =  await mysql.createConnection({
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

      await  connection.query(`INSERT INTO courses_present (logo, fullname, shortdescription, rating, authorId, language, creationDate, price, oldPrice, students, skills, knowledge, description, courseId, category, subCategory, topics, author, mock, reviews) VALUES ('${logo}', '${fullname}', '${shortDescription}', '${rating}', '${authorId}', '${language}', '${creationDate}', '${price}', '${oldPrice}', '${students}', '${skills}', '${knowledge}', '${description}', '${courseId}', '${category}', '${subCategory}', '${topics}', '${author}', '${mock}', '${reviews}')`, (error, result)=>{
            if(error){
                console.log(error)
            } else {
               console.log('Запись создана')
              
            }
           
            
        })

        connection.query(`CREATE TABLE rudemy_project.${courseId}_video ( id INT(11) NOT NULL AUTO_INCREMENT , title VARCHAR(300) NOT NULL , link VARCHAR(300) NOT NULL , PRIMARY KEY (id)) ENGINE = InnoDB`, (error)=>{
            if(error){console.log(error)} else {
                console.log (`Таблица ${courseId}_video создана`)
                res.json({'message': `Курс создан, Таблица ${courseId}_video создана`})
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



    //Функция удаления курса из системы, удаление таблицы с видео, удаление записи из courses_present

    async deleteCourse(req, res) {
        const {courseId} = req.body
        const connection =  await mysql.createConnection({
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


        await connection.query(`DROP TABLE ${courseId}_video`, (error)=>{
            if(error){
                console.log(error)
            } else {
               console.log('Таблица удалена')
                    
                 }
                })

        await connection.query(`DELETE FROM courses_present WHERE courseId = '${courseId}'`, (error)=>{
                    if(error){
                        console.log(error)
                    } else {
                       console.log('Запись из таблицы удалена')
                            
                         }
                        })        


     

        res.json({"message": "Курс был удалён из системы!" })

        await connection.end((error)=> {
            if(error){
                console.log(`Ошибка ${error}`)
            } else {
                console.log('Подключение закрыто')
            }
        })
    }



    async updateCourse(req, res) {
        const {logo, mock, fullname, shortdescription, rating, authorId, language, creationDate, price, oldPrice, students, skills, knowledge, description, courseId, category, subCategory, topics, author, reviews} = req.body.course
       
        const connection =  await mysql.createConnection({
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

        connection.query(`UPDATE courses_present SET fullname = '${fullname}', logo = '${logo}', mock = '${mock}', 
        shortdescription = '${shortdescription}', rating = '${rating}', authorId = '${authorId}',
        language = '${language}', creationDate = '${creationDate}', price = '${price}', oldPrice = '${oldPrice}',
        students = '${students}', skills = '${skills}', knowledge = '${knowledge}', description = '${description}', courseId = '${courseId}',
        category = '${category}', subCategory = '${subCategory}', topics = '${topics}', author = '${author}', reviews = '${reviews}' WHERE courseId LIKE '${courseId}'`, (error, result)=>{
            if(error){
                console.log(error)
            } else {
                console.log(result, req.body.course)
                res.json({"courseId": courseId, "message": "Информация о курсе успешно отредактирована!"})
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


    async createLesson(req, res) {
        const courseId = req.body.id
        const {title, link} = req.body

        const connection =  await mysql.createConnection({
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

        await connection.query(`INSERT INTO ${courseId}_video (title, link) VALUES ('${title}', '${link}')`, (error)=>{
            if(error){
                console.log(error)
            } else {res.json({message: `Урок - ${title} создан`})}
        })

        await connection.end((error)=> {
            if(error){
                console.log(`Ошибка ${error}`)
            } else {
                console.log('Подключение закрыто')
            }
        })
    }





// /course/allcourses
   async getCourses(req, res) {
      const category = req.body.category

      const connection =  await mysql.createConnection({
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

        await connection.query(`SELECT * FROM courses_present WHERE category LIKE '${category}'`, (error, courses)=> {
            if(error){console.log(error)} else {
                res.json({"courses": courses, "request": category})
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

 // /course/getallcourses   
    async getAllCourses(req, res) {

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


        await connection.query(`SELECT * FROM courses_present`, (error, courses)=> {
            if(error){console.log(error)} else {
                res.json({"courses": courses})
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

 async   getOneCourse(req, res){
        const courseId = req.body.courseId   
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

      await connection.query(`SELECT * FROM courses_present WHERE courseId = '${courseId}'`, (error, result)=> {
            if(error){console.log(error)} else {
                if(result.length > 0){
                    const course = result[0]
                res.json({'course': course})
                } else {
                    res.json({'message': 'Курс не найден'})
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

  async  getTeacher(req, res) {
        const id = req.body.authorId
        
        
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

       await connection.query(`SELECT * FROM teacher_user WHERE userId = '${id}'`, (error, result)=> {
            if(error) {console.log(error)} else {
                res.json({"author": result[0]})
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


    async getLessons(req, res) {
        const {courseId} = req.body

        
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

        connection.query(`SELECT * FROM ${courseId}_video`, (error, result)=>{
            if(error){console.log(error)} else {
                if(result.length > 0){
                    res.json({'lessons': result})
                } else {res.json({'message': 'not lessons'})}
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


    async searchCourses(req, res) {
        const query = req.body.query
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

            connection.query(`SELECT * FROM courses_present WHERE fullname LIKE '%${query}%' OR description LIKE '%${query}%' OR author LIKE '%${query}%'`, (error, result)=>{
                if(error){console.log(error)} else {
                    if(result.length > 0){
                        res.json({'courses': result})
                    } else {res.json({'message': 'Курсы не найдены'})}
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

    //Добавление курса пользователю после оплаты

    async addCourse(req, res) {
        const {courseList, userId} = req.body

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

        connection.query(`UPDATE student_user SET courseList = '${courseList}' WHERE userId LIKE '${userId}'`, (error)=>{
            if(error){
                console.log(error)
            } else {
                console.log(`пользователю ${userId} добавлен курс`)
                res.json({'message': `Список курсов пользователя изменён!`})
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



module.exports = new CourseController();