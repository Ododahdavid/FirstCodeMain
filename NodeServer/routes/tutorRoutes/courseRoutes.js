import mongoose from "mongoose";
import express from "express";
import Course from "../../models/tutorModels/coursesModel.js";
import loggedIn from "../../middlewares/isLoggedIn.js";
import Restrict from "../../middlewares/restrict.js"
import Tutor from "../../models/tutorModels/tutorModel.js";

const router = express.Router();


// route or function create a course
// i restricted this fucntion to only logged in tutors
router.post("/tutor/new/course", loggedIn, Restrict("tutor"),  async (req, res, next) => {
    try {
        req.body.tutorId = req.tutor._id;
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (err) {
        next(err);
    }
});

//  route or function to get all of the cuurent logged in courses, so they can view thwm in their dashboard
// i restricted this fucntion to only logged in tutors
  // i used populate to include the tutor's first and last name in the course document
  // so the frontend can display them in the courses list.
 // i also added a restriction to only logged in tutors to access this route.
 // you can add more restrictions or conditions as needed.
 // i also added error handling in case any error occurs during the database operations.
 // for example, if the course document is not found in the database, i return a 404 error.
router.get("/tutor/get/courses", loggedIn, Restrict("tutor"), async (req, res, next) => {
    try {
      const tutorId = req.tutor._id; // Tutor ID from the middleware
      const currentTutorCourses = await Course.find({ tutorId: tutorId }).populate("tutorId", 'firstname lastname');
      res.status(200).json(currentTutorCourses);

    } catch (err) {
      next(err);
    }
  });

  // route or function to Delete a course

router.delete("/tutor/delete/course/:courseId", loggedIn, Restrict("tutor"), async (req, res, next) => {
  try {
      const courseId = req.params.courseId;
      const tutorId = req.tutor._id;

      // Find and delete the course only if it belongs to the logged-in tutor
      const course = await Course.findOneAndDelete({ _id: courseId, tutorId });

      if (!course) {
          return res.status(404).json({ message: "Course not found or you don't have permission to delete this course." });
      }

      res.status(200).json({ message: "Course deleted successfully." });
  } catch (err) {
      next(err);
  }
});



export default router;