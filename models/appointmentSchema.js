import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({

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
        minLength: [8, "UID number must contains 8 digits !"],
        maxLength: [8, "UID number must contains 8 digits !"]
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
    appointment_date: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    hasVisited: {
        type: Boolean,
        default:false
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Accepted", "Rejected", "Pending"],
        default: "Pending",
    }
})

export const Appointment = mongoose.model("Appointment", appointmentSchema);
