import { catchAsyncError } from './../middlewares/catchAsyncErrors.js';
import { Appointment } from './../models/appointmentSchema.js';
import { User } from "../models/userSchema.js";
import ErrorHandler from './../middlewares/errorMiddleware.js';


/** Book Appointment */
export const postAppointment = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, uid, dob, gender, appointment_date, department, doctor_firstName, doctor_lastName, hasVisited, address } = req.body;

    if (!firstName || !lastName || !email || !phone || !uid || !dob || !gender || !appointment_date || !department || !doctor_firstName || !doctor_lastName || !address) {
        return next(new ErrorHandler("Please provide all Appointment related Details !", 400))
    }

    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "DOCTOR",
        doctorDepartment: department
    })
    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor Not Found !", 404))
    }
    if (isConflict.length > 1) {
        return next(new ErrorHandler("Doctor Conflict ! Please Contact through Email or Phone", 404))
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;

    const appointment = await Appointment.create({
        firstName, lastName, email, phone, uid, dob, gender, appointment_date, department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName
        },
        hasVisited, address, doctorId, patientId
    })
    res.status(200).json({
        success: true,
        message: "Appointment Sent Successfully !",
        appointment
    })

})

/** Get all Appointment */

export const getAllAppointment = catchAsyncError(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments
    })
})

/** Update Appointment */
export const updateAppointment = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not Found !", 404))
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message:"Appointment Status Updated",
        appointment
    })
})