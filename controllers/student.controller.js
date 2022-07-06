const mysql = require('mysql')


class StudentController {

    async getAllStudents(req, res) {

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