const nodemailer = require('nodemailer')




class MailController {



async sendMail(req, res) {
    const message = req.body.mail
    const user = 'stender233@gmail.com'
    const password = 'ser549297'

    const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'stender233@gmail.com',
            pass: 'ser549297',
            
        }
    })

    const mailOptions = {
        from: 'stender233@gmail.com',
        to: 'stender233@gmail.com',
        subject: 'Письмо с сервера Rudemy',
        text: `Текст письма`
    }

    transporter.sendMail(mailOptions)

    res.json({'message': `Сообщение отправлено, текст: ${message}`})
    
}






}


module.exports = new MailController()