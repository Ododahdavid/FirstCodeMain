import mongoose from "mongoose";
import Tutor from "./tutorModel.js";

const courseSchema = new mongoose.Schema({
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
    date: { type: Date, required: true, default: Date.now, immutable: true }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
