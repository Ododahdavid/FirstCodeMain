import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import studentRoutes from "./routes/studentRoutes/studentRoutes.js"
import CourseRoutes from "./routes/tutorRoutes/courseRoutes.js"

dotenv.config({ path: './config.env' });

import tutorRoutes from "./routes/tutorRoutes/tutorRoutes.js"


const app = express(); 
const PORT = process.env.PORT || 7800;

let MONGO_URI = '';
if (process.env.NODE_ENV === 'production') {
  MONGO_URI = process.env.HOSTED_CONN;
} else {
  MONGO_URI = process.env.LOCAL_CONN;
} 
  
app.use(cors());
app.use(express.json());

app.use('/api/v1/user', tutorRoutes);
app.use('/api/v1/user', studentRoutes);
app.use('/api/v1/user', CourseRoutes);


app.use('/', (req, res) => {
  res.send('This is the default response...try again');
});



mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
