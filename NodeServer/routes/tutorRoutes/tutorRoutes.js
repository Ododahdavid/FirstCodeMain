import express from 'express';
import jwt from 'jsonwebtoken';
import Tutor from '../../models/tutorModels/tutorModel.js'
import sendEmail from "../../utils/email.js";
import crypto from "crypto"




const router = express.Router();

const sendResetEmail = (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Please use the following token to reset your password: ${token}. If you did not request a password reset, please ignore this message.`,
  };

  return transporter.sendMail(mailOptions);
};



const generateSignToken = (_id, email, experiencelevel) => {
  const payload = {
    _id,
    email,
    experiencelevel,
  };
  const exp = { expiresIn: process.env.LOGIN_EXP };
  const secretkey = process.env.JWT_SECRET;
  return jwt.sign(payload, secretkey, exp);
};

// register a tutor
router.post('/new/tutor', async (req, res, next) => {
  const { firstname, lastname, email, experiencelevel, password } = req.body;

  try {
    const tutorExists = await Tutor.findOne({ email });

    if (tutorExists) {
      return res.status(400).json({ message: 'This tutor already exists' });
    }

    const tutor = await Tutor.create({
      firstname,
      lastname,
      email,
      experiencelevel,
      password,
    });


    if (tutor) {
      res.status(201).json({
        _id: tutor._id,
        firstname: tutor.firstname,
        lastname: tutor.lastname,
        email: tutor.email,
        experiencelevel: tutor.experiencelevel,
        token: generateSignToken(tutor._id, tutor.email, tutor.experiencelevel),

      });
    } else {
     return  res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    // res.status(500).send(err.message);

    next(err);
  }
});


//login a tutor
router.post("/login/tutor", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const tutor = await Tutor.findOne({ email }).select("+password")

    if (tutor && (await tutor.comparePassword(password))) {
      res.json({
        _id: tutor._id,
        firstname: tutor.firstname,
        lastname: tutor.lastname,
        email: tutor.email,
        experiencelevel: tutor.experiencelevel,
        token: generateSignToken(tutor._id, tutor.email, tutor.experiencelevel),
      })
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  }
  catch (err) {
    next(err) 
  }
})


// Request password reset
router.post('/tutor/new/password', async (req, res, next) => {
  const { email } = req.body;

  try {
    const tutor = await Tutor.findOne({ email });

    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    const resetToken = crypto.randomBytes(3).toString('hex');
    const resetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    tutor.resetPasswordToken = resetToken;
    tutor.resetPasswordExpires = resetTokenExpires;
    await tutor.save();

    await sendEmail({
      to: email,
      subject: 'Password Reset',
      html: `
      <html>
        <head>
          <style>
            h1 {
              color: blue;
            }
          </style>
        </head>
        <body>
          <p>Hi ${tutor.firstname},</p>
          <p>
            We have received a password reset request for your account.
            If you did not make this request, please ignore this message.
            Here is your code below:
          </p>
          <h1>${resetToken}</h1>
          <h2>This code expires after 10 minutes from the request time.</h2>
        </body>
      </html>
      `,
    });

    res.status(200).json({ message: 'Reset token sent to email' });
  } catch (err) {
    // if the email does not successfully send, i performed another try and catch to find the user in the database, and set the token and its due time to undefined... since the user did not recieve recieve the token.
    try {
      const tutor = await Tutor.findOne({ email });
      if (tutor) {
        tutor.resetPasswordToken = undefined;
        tutor.resetPasswordExpires = undefined;
        await tutor.save();
      }
    } catch (saveErr) {
      console.error('Error resetting token fields:', saveErr);
    }

    console.error('Error sending email:', err);
    return res.status(500).json({ message: 'Error sending email. Please try again later.' });
  }
});
  


// Resetting user password
router.post('/tutor/reset/password', async (req, res, next) => {
  const { email, token, newPassword } = req.body;

  try {
    const tutor = await Tutor.findOne({
      email, 
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!tutor) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    tutor.password = newPassword; // Making sure to hash the password before saving
    tutor.resetPasswordToken = undefined;
    tutor.resetPasswordExpires = undefined;
    await tutor.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {

    if (err.name === 'ValidationError') {
      // Handle Mongoose validation error
      const errorMessage = Object.values(err.errors).map(val => val.message).join(', ');
      return res.status(400).json({ message: errorMessage });
    }

    next(err);
  }
});

export default router;