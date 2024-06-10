import mongoose from "mongoose";
import { config } from "dotenv";

config()

// console.log(process.env.MONGO_URI);
export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: "MERN_STACK_HOSPITAL_MANAGEMENT" })
        .then(() => {
            console.log(`Databse connected successfully`);
        })
        .catch((err) => {
            console.log(`${err} Error occured while connecting database`);
        })
}