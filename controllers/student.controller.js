const mysql = require('mysql')
const config = require('../config')

class StudentController {

    async getAllStudents(req, res) {

        const connection = await mysql.createConnection({
                host: config.host,
                user: config.user,
                password: config.password,
                database: config.database
        })

        await connection.connect((error)=> {
            if(error){
                return console.log('Ошибка подключения к базе данных!')
            } else {
                return console.log('Подключение успешно')
            }
        })

        await connection.query(`SELECT * FROM student_user`, (error, result)=> {
            if(error){
                console.log(error)
            } else {
                res.json({"students": result})
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

module.exports = new StudentController()