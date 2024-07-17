import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../../models/studentModels/studentModel.js'
import sendEmail from "../../utils/email.js";
import crypto from "crypto"

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

  export default router;