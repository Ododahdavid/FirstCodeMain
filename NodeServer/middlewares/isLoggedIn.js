import jwt from 'jsonwebtoken';
import Tutor from '../models/tutorModels/tutorModel.js';

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

      // Fetch the tutor from the database using the decoded _id
      const tutor = await Tutor.findById(decoded._id).select('-password');

      if (!tutor) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      req.tutor = tutor; // Attach tutor to request object
      next(); // Proceed to next middleware/route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default loggedIn;
