const db = require('../db');



class UserController {

   createUser(req, res) {
           console.log(req.body)
   const {email, password, name} = req.body
//    const userId = `user_ID_`;
   const token = '1hdn345bnqjejwjwjjqjq' 
   const userId = 'user_ID_jnd76jf876lkdn'
   const query = `INSERT INTO student_user (name, email, password, userId, token) VALUES ('${name}', '${email}', '${password}', '${userId}', '${token}')`

           db.query(query, (error, result)=>{
                if(error){
                        console.log(`ERROR_ERROR ${error}`)
                } else {
                        console.log('Успешно')
                }
        })

    }

    getUsers(req, res) {
        const userId = `user_ID_09hfnt99w9a9w9ka`;
                db.query(`SELECT * FROM student_user WHERE userId LIKE '${userId}'`, (error, result, fields)=> {
                        if(error){
                                console.log(`ERROR_ERROR ${error}`)
                        } else {
                            res.json(result)            
                        }

                })   


    }


    getOneUser(req, res) {
        
    }

   updateUser(req, res) {
        
    }

    deleteUser(req, res) {
        
    }
}


module.exports = new UserController();