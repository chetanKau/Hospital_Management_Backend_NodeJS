import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from './../models/userSchema.js';
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

/*** PATIENT REGISTRATION ***/
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

    generateToken(user, "User Registered Successfully", 200, res)

})


/***LOGIN ***/
export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Invalid Login credentials !", 400))
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and confirm password not matched !", 400))
    }

    const userDB = await User.findOne({ email }).select("+password")
    // console.log(user.email,"emal");

    if (!userDB) {
        return next(new ErrorHandler("Invalid user name or password !", 400))
    }
    // console.log("userDB-", userDB);
    const isPasswordMatched = await userDB.comparePassword(password)

    // const isPasswordMatched = await bcrypt.compareSync(password, userDB.password);

    if (!isPasswordMatched) {
        console.log("Password not matched");
        return next(new ErrorHandler("Invalid user name or password !", 400))
    }
    if (role !== userDB.role) {
        return next(new ErrorHandler("User role Mismatched !", 400))
    }
    generateToken(userDB, "User Login Successfully", 200, res)

})


/*** ADD NEW ADMIN ***/
export const addNewAdmin = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, uid, password, gender } = req.body;
    if (!firstName || !lastName || !email || !phone || !dob || !uid || !password || !gender) {
        return next(new ErrorHandler("Please fill your form !", 400))
    }

    const isUserAlreadyRegistered = await User.findOne({ email })
    if (isUserAlreadyRegistered) {
        return next(new ErrorHandler(`${isUserAlreadyRegistered.role} is already registered with this Email !`))
    }

    const admin = await User.create({
        firstName, lastName, email, phone, dob, uid, password, gender, role: "ADMIN"
    })
    // console.log("New admin-",admin);

    res.status(200).json({
        success: true,
        message: "New Admin Registered Successfully"
    })


})


/*** Get All Doctors ***/
export const getAllDoctors = catchAsyncError(async (req, res, next) => {
    const doctors = await User.find({ role: "DOCTOR" })

    res.status(200).json({
        success: true,
        doctors
    })
})


/*** Get All Users ***/
export const getUserDetails = catchAsyncError(async (req, res, next) => {
    const allUsers = req.user
    res.status(200).json({
        success: true,
        allUsers
    })
})


/*** Logout Admin ***/
export const logoutAdmin = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin Logged Out Successfully"
    })
})


/*** Logout User/Patient ***/
export const logoutUser = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User Logged Out Successfully"
    })
})


/*** Add New Doctor ***/
export const addNewDoctor = catchAsyncError(async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar is required !"), 400)
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format not Supported !"), 400)
    }

    const { firstName, lastName, email, phone, dob, uid, password, gender, doctorDepartment } = req.body;
    if (!firstName || !lastName || !email || !phone || !dob || !uid || !doctorDepartment || !password || !gender) {
        return next(new ErrorHandler("Please Provide all Detail of Doctor"), 400)
    }

    const isRegistered = await User.findOne({ email })
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} is registered Already with this email !`), 400)
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error : ", cloudinaryResponse.error || "Unknown Cloudinay Error")
    }

    const doctor = await User.create({
        firstName, lastName, email, phone, dob, uid, password, gender, doctorDepartment, role: "DOCTOR",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    })
    res.status(200).json({
        success: true,
        message: "Doctor Registered Successfully",
        doctor
    })
})
