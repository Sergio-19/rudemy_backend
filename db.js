const mysql = require('mysql')

const connection = mysql.createConnection({
    // host: 'stended3.beget.tech',
    // user: 'stended3_rudemy',
    // password: 'Se549297',
    // database: 'stended3_rudemy'

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'rudemy_project'
})

connection.connect((error)=> {
    if(error){
        return console.log('Ошибка подключения к базе данных!')
    } else {
        return console.log('Подключение успешно')
    }
})


// connection.end((error)=> {
//     if(error){
//         console.log(`Ошибка ${error}`)
//     } else {
//         console.log('Подключение закрыто')
//     }
// })


module.exports = connection