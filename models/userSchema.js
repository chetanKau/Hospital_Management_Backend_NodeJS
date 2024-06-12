import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must contains min 3 characters !"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must contains min 3 characters !"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Enter Your Valid Email !"]
    },
    phone: {
        type: Number,
        required: true,
        minLength: [10, "Phone number must contains exact 10 digits !"],
        maxLength: [10, "Phone number must contains exact 10 digits !"]
    },
    uid: {
        type: String,
        required: true,
        minLength: [8, "NIC number must contains 8 digits !"],
        maxLength: [8, "NIC number must contains 8 digits !"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is Required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    password: {
        type: String,
        minLength: [8, "Password must contains 8 characters"],
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "PATIENT", "DOCTOR"]
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    }

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password =await bcrypt.hash(this.password, 16);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebtoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES })
}

// module.exports = comparePassword;
export const User = mongoose.model("User", userSchema);