    const db = require('../db')

class CourseController {

  async  createCourse(req, res) {
        const {logo, fullname, shortDescription, rating, authorId, language, creationDate, price, oldPrice, students, skills, knowledge, description, courseId, category, subCategory, topics} = req.body

      await  db.query(`INSERT INTO courses_present (logo, fullname, shortdescription, rating, authorId, language, creationDate, price, oldPrice, students, skills, knowledge, description, courseId, category, subCategory, topics) VALUES ('${logo}', '${fullname}', '${shortDescription}', '${rating}', '${authorId}', '${language}', '${creationDate}', '${price}', '${oldPrice}', '${students}', '${skills}', '${knowledge}', '${description}', '${courseId}', '${category}', '${subCategory}', '${topics}')`, (error, result)=>{
            if(error){
                console.log(error)
            } else {
                db.query(`CREATE TABLE rudemy_project.${courseId}_video ( id INT(11) NOT NULL AUTO_INCREMENT , title VARCHAR(300) NOT NULL , link VARCHAR(300) NOT NULL , PRIMARY KEY (id)) ENGINE = InnoDB`, (error)=>{
                    if(error){console.log(error)} else {
                        console.log (`Таблица ${courseId}_video создана`)
                    }
                })
            }

        })



    }





// /course/allcourses
   async getCourses(req, res) {
      const category = req.body.category
        await db.query(`SELECT * FROM courses_present WHERE category LIKE '${category}'`, (error, courses)=> {
            if(error){console.log(error)} else {
                res.json({"courses": courses, "request": category})
            }
        })

        

    }

 // /course/getallcourses   
    async getAllCourses(req, res) {
        await db.query(`SELECT * FROM courses_present`, (error, courses)=> {
            if(error){console.log(error)} else {
                res.json({"courses": courses})
            }
        })
    }

 async   getOneCourse(req, res){
        const courseId = req.body.courseId

        db.query(`SELECT * FROM courses_present WHERE courseId = '${courseId}'`, (error, result)=> {
            if(error){console.log(error)} else {
                if(result.length > 0){
                    const course = result[0]
                res.json({'course': course})
                } else {
                    res.json({'message': 'Курс не найден'})
                }
            }
        })    
    }

    getTeacher(req, res) {
        const id = req.body.authorId
        db.query(`SELECT * FROM teacher_user WHERE userId = '${id}'`, (error, result)=> {
            if(error) {console.log(error)} else {
                res.json({"author": result})
            }
        })
    }


    async getLessons(req, res) {
        const {courseId} = req.body
        db.query(`SELECT * FROM ${courseId}_video`, (error, result)=>{
            if(error){console.log(error)} else {
                if(result.length > 0){
                    res.json({'lessons': result})
                } else {res.json({'message': 'not lessons'})}
            }
        })
    }



}



module.exports = new CourseController();