import  mongoose from "mongoose"
import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../../models/studentModels/studentModel.js'
import sendEmail from "../../utils/email.js";
import crypto from "crypto"
import Course from '../../models/tutorModels/coursesModel.js';
import loggedIn from '../../middlewares/isLoggedIn.js';
import Restrict from '../../middlewares/restrict.js';
import pkg from 'node-cache';
const NodeCache = pkg;


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
    const student = await Student.findOne({ email }).select("+password");

    if (!student || !(await student.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day

    if (student.lastLogin) {
      const lastLogin = new Date(student.lastLogin);
      lastLogin.setHours(0, 0, 0, 0); // Set to beginning of day hours =0, minutes = 0, seconds = 0, milliseconds = 0

      const diffInDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));

      if (diffInDays === 0) {
        // Same day login, don't change streak
      } else if (diffInDays === 1) {
        // Consecutive day login, increment streak
        student.streak += 1;
      } else {
        // More than one day gap, reset streak
        student.streak = 0;
      }
    } else {
      // First time login
      student.streak = 0;
    }

    student.lastLogin = new Date(); // Set to current time
    await student.save();

    res.json({
      _id: student._id,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      streak: student.streak,
      token: generateSignToken(student._id, student.email),
    });
  } catch (err) {
    next(err);
  }
});


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

// function to search for a course using it's course Id

const courseCache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes


router.get("/student/course/:courseId", loggedIn, Restrict("student"), async (req, res, next) => {
  try {
      const courseId = req.params.courseId;
      
      // Basic validation
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
          return res.status(400).json({ message: "Invalid course ID format" });
      }

      // Find course and populate tutor details
      const courseDetails = await Course.findById(courseId)
          .populate('tutorId', 'firstname lastname email')
          .lean();

      if (!courseDetails) {
          return res.status(404).json({ message: "Course not found" });
      }

      res.status(200).json(courseDetails);

  } catch (error) {
      console.error("Error fetching course details:", error);
      next(error);
  }
});

// function to enroll  a course.
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

    // Incrementing the studentCount in the course
    const course = await Course.findById(courseId);
    course.studentCount += 1
    await course.save() //saving the current amount of students enrolled in the course

    // i plan on sending a notification to the tutor about a new enrollment in one of his courses
    // coming soon....
  }
  catch(err){
    next("error message:", err.message)
  }
})

// route to get the students enrolled Courses
router.get("/student/enrolledCourses", loggedIn, Restrict("student"), async (req, res, next) => {
  try {
    const studentId = req.user._id;
    const student = await Student.findById(studentId).lean();
    // .lean() is used to get plain javascript object instead of mongoose documents which can be more efficient

    const enrolledCourses = await Course.find({
      _id: { $in: student.enrolledCourses }
    }).populate({
      path: 'tutorId',
      select: 'firstname lastname'
    }).lean();

    res.status(200).json(enrolledCourses);
  } catch (err) {
    next(err);
  }
});

export default router;