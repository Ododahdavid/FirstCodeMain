import jwt from 'jsonwebtoken';
import Tutor from '../models/tutorModels/tutorModel.js';
import Student from '../models/studentModels/studentModel.js';

// Middleware to ensure the user is logged in
const loggedIn = async (req, res, next) => {
  let token;

  // Check if the authorization header is present and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token from header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      if (!decoded._id) {
        return res.status(401).json({ message: 'Not authorized, token invalid' });
      }

      // Try to find the user as a Tutor first
      let user = await Tutor.findById(decoded._id).select('-password');

      // If no Tutor is found, try finding the user as a Student
      if (!user) {
        user = await Student.findById(decoded._id).select('-password');
      }

      // If no user (either Tutor or Student) is found, return an error
      if (!user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // Attach the found user (either Tutor or Student) to the request object
      req.user = user;

      next(); // Proceed to next middleware/route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default loggedIn;
