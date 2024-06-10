import mongoose, { Types } from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true,
        minLength: [3, "First name must contains min 3 characters !"]
    },
    lastName: {
        type: String,
        require: true,
        minLength: [3, "Last name must contains min 3 characters !"]
    },
    email: {
        type: String,
        require: true,
        validate: [validator.isEmail, "Please Enter Your Valid Email !"]
    },
    phone: {
        type: String,
        require: true,
        minLength: [11, "Phone number must contains 11 digits !"],
        maxLength: [11, "Phone number must contains 11 digits !"]
    },
    message: {
        type: String,
        require: true,
        minLength: [10, "Message must contains min 10 characters !"]
    },

})

export const Message = mongoose.model("Message", messageSchema);