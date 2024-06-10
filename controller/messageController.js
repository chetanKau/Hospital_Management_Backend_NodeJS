import { Message } from "../models/messageSchema.js";
import {catchAsyncError} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage =  catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please Fill your Full form !",400))
    }

    await Message.create({ firstName, lastName, email, phone, message })
       res.status(200).json({
        success: true,
        message: "Message Send Successfully"
    });

})

