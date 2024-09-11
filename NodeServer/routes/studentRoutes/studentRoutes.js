import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../../models/studentModels/studentModel.js'
import sendEmail from "../../utils/email.js";
import crypto from "crypto"
import Course from '../../models/tutorModels/coursesModel.js';
import loggedIn from '../../middlewares/isLoggedIn.js';
import Restrict from '../../middlewares/restrict.js';

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


    if (student) {
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

    // calculating for user streak
    const today = new Date();
    const lastLoginDate = new Date(student.lastLogin)
    const diffInDays = Math.floor((today - lastLoginDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 1) {
      student.streak += 1 // incrementing the users streak if they log in the next consecutive day
    }
    else if (diffInDays > 1) {
      student.streak = 0 // setting the streak to 0 if they logged in more than a day since last login
    }

    student.lastLogin = today
    await student.save()// saving the updated student data

    if (student && (await student.comparePassword(password))) {
      res.json({
        _id: student._id,
        firstname: student.firstname,
        lastname: student.lastname,
        email: student.email,
        streak: student.streak,
        token: generateSignToken(student._id, student.email),
      })
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  }
  catch (err) {
    next(err)
  }
})



// endpoint to get top 20 recommended courses fromtutor in the student search page
router.get("/student/recommended/courses",loggedIn, async (req, res, next) => {
  try {
    const offset = parseInt(req.query.offset) || 0;  // Default to offset 0
    const limit = parseInt(req.query.limit) || 20;  // Default to 20 courses per request

    // Fetch the courses and populate the tutor's firstname and lastname
    const recommendedCourses = await Course.find()
      .skip(offset)
      .limit(limit)
      .populate({
        path: 'tutorId',  // This should be the reference field in your Course schema
        select: 'firstname lastname'  // Specify the fields to retrieve
      });

    // If no courses are found, send a 404 response
    if (recommendedCourses.length === 0) {
      return res.status(404).send({ message: "No recommended courses found" });
    }

    // Send the recommended courses as a response
    res.status(200).send(recommendedCourses);
  } catch (err) {
    // Log the error and send a 500 response with a generic error message
    console.error(err);
    res.status(500).send({ message: "An error occurred while fetching recommended courses" });
  }
});


// i am setting a reminder below this to remind me of what i thik the frontend implementstion should look and work like
/*
  let offset = 0;
const limit = 20;

window.addEventListener('scroll', async () => {
// Check if the user has scrolled near the bottom of the page
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
  // Fetch more courses
  const response = await fetch(`/student/recommended/courses?offset=${offset}&limit=${limit}`);
  const courses = await response.json();

  // Append new courses to the page (this is where you'd update your UI)
  appendCoursesToUI(courses);

  // Update the offset for the next request
  offset += limit;
}
});

function appendCoursesToUI(courses) {
// Your logic to append courses to the DOM
}

*/

router.post("/student/searched/courses", loggedIn, async (req, res, next)=>{
  try{
    const {value} = req.body;
    const searchedCourses = await Course.find({
      title: { $regex: `${value}`, $options: "i"} // this searches for any course that contains  the value of the search. and it is case insensitive.
    }).populate({
      path: 'tutorId',  // This should be the reference field in your Course schema
      select: 'firstname lastname'  // Specify the fields to retrieve
    });
    res.json(searchedCourses)
  }
  catch(err){
    next(err)
  }
})

router.post("/student/enroll/:courseId", loggedIn, Restrict("student"), async(req, res, next)=>{
  try{
    const studentId = req.user._id; //getting the student Id from the loggedIn middle ware
    const courseId = req.params.courseId // getting the course Id from the request parameters

    //Checking if the student has already enrolled for this course
    const student = await Student.findById(studentId)
    if(student.enrolledCourses.includes(courseId)){
      res.status(400).send({message: "You have enrolled for this course already"})
    }

    // Enrolling sudent into the course
    student.enrolledCourses.push(courseId)
    await student.save();
    res.send({message: "Course Enrolled Successfully"})
    // i plan on sending a notification to the tutor about a new enrollment in one of his courses
    // coming soon....
  }
  catch(err){
    next("error message:", err.message)
  }
})

export default router;