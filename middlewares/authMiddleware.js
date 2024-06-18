import { catchAsyncError } from './catchAsyncErrors.js';
import ErrorHandler from './errorMiddleware.js';
import { User } from '../models/userSchema.js';
import jwt from 'jsonwebtoken';


/**  Admin Athuorization code   */
export const isAdminAuthorized = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.adminToken;

    if (!token) {
        return next(new ErrorHandler("Admin in Authorized !"), 400)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)

    if (req.user.role !== "ADMIN") {
        return next(new ErrorHandler(`${req.user.role} not authorized as admin !`), 403)
    }

    next();

})


/**  Patient Athuorization code   */
export const isPatientAuthorized = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.patientToken;

    if (!token) {
        return next(new ErrorHandler("Patient is not Authorized !"), 400)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)

    if (req.user.role !== "PATIENT") {
        return next(new ErrorHandler(`${req.user.role} not authorized as admin !`), 403)
    }

    next();

})