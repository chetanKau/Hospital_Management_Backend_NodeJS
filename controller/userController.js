import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import  ErrorHandler  from "../middlewares/errorMiddleware.js"
import { User } from './../models/userSchema.js';

export const patientRegister = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, uid, role, password, gender } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !dob ||
        !uid ||
        !role ||
        !password ||
        !gender
    ) {
        return next(new ErrorHandler("Please fill your form !", 400))
    }
    let user = await User.findOne({ email })
    if (user) {
        return next(new ErrorHandler("User already registered !", 400))
    }

    user = User.create({ firstName, lastName, email, phone, dob, uid, role, password, gender })

    return res.status(200).json({
        status:true,
        message:"User Registered Successfully"
    })
})