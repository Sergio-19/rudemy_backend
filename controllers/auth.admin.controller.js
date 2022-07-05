

class AuthAdminController {

    async adminLogin(req, res) {
        const {password} = req.body
        const adminPassword = 'an0900218'
        const moderatorPassword = 'mr0900218'

        let adminToken = 'anJzdWIiOiIxMjM0NSIsIm5hbWUiOiJKb2huIEdvbGQiLCJhZG1pbiI6dHJ1ZX0K'
        let moderatorToken = 'mrJzdWIiOiIxMjM0NSIsIm5hbWUiOiJKb2huIEdvbGQiLCJhZG1pbiI6dHJ1ZX0K'

        if(password === adminPassword){
            res.json({"message": "Вы вошли в систему как администратор", "token": adminToken})
        } else if(password === moderatorPassword){
            res.json({"message": "Вы вошли в систему как модератор", "token": moderatorToken})
        } else {
            res.json({"message": "Вы ввели неверный пароль!"})
        }
       
         
    }

}

module.exports = new AuthAdminController()