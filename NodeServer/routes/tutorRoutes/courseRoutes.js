import mongoose from "mongoose";
import express from "express";
import Course from "../../models/tutorModels/coursesModel.js";
import loggedIn from "../../middlewares/isLoggedIn.js";
import Restrict from "../../middlewares/restrict.js"
import Tutor from "../../models/tutorModels/tutorModel.js";

const router = express.Router();


// create a course
router.post("/tutor/new/course", loggedIn, Restrict("tutor"),  async (req, res, next) => {
    try {
        req.body.tutorId = req.tutor._id;
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (err) {
        next(err);
    }
});

router.get("/tutor/get/courses", loggedIn, Restrict("tutor"), async (req, res, next) => {
    try {
      const tutorId = req.tutor._id; // Tutor ID from the middleware
      const currentTutorCourses = await Course.find({ tutorId: tutorId }).populate("tutorId", 'firstname lastname');
      res.status(200).json(currentTutorCourses);
      console.log(currentTutorCourses)
    } catch (err) {
      next(err);
    }
  });

  // Delete a course
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