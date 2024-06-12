import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"
import { User } from './../models/userSchema.js';
import bcrypt from "bcrypt";

export const patientRegister = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, uid, role, password, gender } = req.body;
    if (!firstName || !lastName || !email || !phone || !dob || !uid || !role || !password || !gender) {
        return next(new ErrorHandler("Please fill your form !", 400))
    }
    let user = await User.findOne({ email })
    if (user) {
        return next(new ErrorHandler("User already registered !", 400))
    }

    user = User.create({ firstName, lastName, email, phone, dob, uid, role, password, gender })

    return res.status(200).json({
        status: true,
        message: "User Registered Successfully"
    })
})


export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Invalid Login credentials !", 400))
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and confirm password not matched !", 400))
    }

    const userDB =await User.findOne({ email }).select("+password")
    // console.log(user.email,"emal");

    if (!userDB) {
        return next(new ErrorHandler("Invalid user name or password !", 400))
    }
    console.log("userDB-", userDB);
    const isPasswordMatched = await userDB.comparePassword(password)

    // const isPasswordMatched = await bcrypt.compareSync(password, userDB.password);

    if (!isPasswordMatched) {
        console.log("Password not matched");
        return next(new ErrorHandler("Invalid user name or password !", 400))
    }
    if (role !== userDB.role) {
        return next(new ErrorHandler("User role Mismatched !", 400))
    }
    return res.status(200).json({
        status: true,
        message: "User Login Successfully"
    })

})