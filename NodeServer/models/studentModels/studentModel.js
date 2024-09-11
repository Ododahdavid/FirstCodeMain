import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const studentSchema = new mongoose.Schema({
    firstname: {type: String, required: [true, "please enter your first name"]},
    lastname: {type: String, required: [true, "please enter your last name"]},
    email: {type: String, required: [true, "please enter a valid email address"], unique: true, lowercase: true, trim: true },
    password: {type: String, required: [true, "please enter a password"], minlength: [8, 'password must be at least 8 characters'], select: false},
    streak: {type:Number, default: 0},
    lastLogin: { type: Date }, // Add this field to track the last login date
    role: {type: String, required: true, default: "student"},
    resetPasswordToken: { type: String }, 
    resetPasswordExpires: { type: Date },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: 0 }]
    //Updating my student model to include a reset token and its expiry:
})

studentSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

studentSchema.methods.comparePassword = async function(userPassword) {
    return bcrypt.compare(userPassword, this.password);
};

const Student = mongoose.model('students', studentSchema);

export default Student;