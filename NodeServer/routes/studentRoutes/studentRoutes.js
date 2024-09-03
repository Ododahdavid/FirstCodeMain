import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../../models/studentModels/studentModel.js'
import sendEmail from "../../utils/email.js";
import crypto from "crypto"
import Course from '../../models/tutorModels/coursesModel.js';

const router = express.Router();

const generateSignToken = (_id, email) => {
    const payload = {
      _id,
      email,
    };
    const exp = { expiresIn: process.env.LOGIN_EXP };
    const secretkey = process.env.JWT_SECRET;
    return jwt.sign(payload, secretkey, exp);
  };


  // Route to Create / register a new student into the system
router.post('/new/student', async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
  
    try {
      const studentExists = await Student.findOne({ email });
  
      if (studentExists) {
        return res.status(400).json({ message: 'This student already exists' });
      }
  
      const student = await Student.create({
        firstname,
        lastname,
        email,
        password,
      });
  
  
      if (student){
        res.status(201).json({
          _id: student._id,
          firstname: student.firstname,
          lastname: student.lastname,
          email: student.email,
          token: generateSignToken(student._id, student.email),
  
        });
      } else {
        return res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (err) {  
      next(err);
    }
  });

  //login a student
router.post("/login/student", async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const student = await Student.findOne({ email }).select("+password")
  
      if (student && (await student.comparePassword(password))) {
        res.json({
          _id: student._id,
          firstname: student.firstname,
          lastname: student.lastname,
          email: student.email,
          token: generateSignToken(student._id, student.email),
        })
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
    }
    catch (err){
      next(err) 
    }
  })



  // endpoint to get top 20 recommended courses fromtutor in the student search page
  router.get("/student/recommended/courses", async(req, res, next) => {
    try{
      const offset = parseInt(req.query.offset) || 0;  // Default to offset 0... the offset represesnt the amount of courses allready fetched from the database. 
      const limit = parseInt(req.query.limit) || 20;  // Default to 20 courses per request
      // code to fetch the first 20 recommended courses from tutors on students search page.
      const recommendedCourses = await Course.find().skip(offset).limit(limit)
      // the line above, simply skips the offset and fetches the next set of data in this case courses. and maintains a limit of 20 courses to be fetched
      // If no courses are found, send a 404 response
      if (recommendedCourses.length === 0) {
        return res.status(404).send({ message: "No recommended courses found" });
      }
  
      // Send the recommended courses as a response
      res.status(200).send(recommendedCourses);
    }
    catch(err){
       // Log the error and send a 500 response with a generic error message
    console.error(err);
    res.status(500).send({ message: "An error occurred while fetching recommended courses" });
    }
  })

  export default router;