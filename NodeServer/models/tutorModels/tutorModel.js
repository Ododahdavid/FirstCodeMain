import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const tutorSchema = new mongoose.Schema({ 
    firstname: {type: String, required: [true, "please enter your first name"]},
    lastname: {type: String, required: [true, "please enter your last name"]},
    email: {type: String, required: [true, "please enter a valid email address"], unique: true, lowercase: true, trim: true },
    experiencelevel: {type: String, required: true},
    password: {type: String, required: [true, "please enter a password"], minlength: [8, 'password must be at least 8 characters'], select: false},
    role: {type: String, required: true, default: "tutor"},
    resetPasswordToken: { type: String }, 
    resetPasswordExpires: { type: Date },
    //Updating my tutor model to include a reset token and its expiry:
})

tutorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

tutorSchema.methods.comparePassword = async function(userPassword) {
    return bcrypt.compare(userPassword, this.password);
};

const Tutor = mongoose.model('Tutor', tutorSchema);

export default Tutor;