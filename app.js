import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js"
import appointmentRouter from "./router/appointmentRouter.js"

const app = express();

// config()

// app.use(cors({
//     origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
//   }));



const allowedOrigins = [process.env.FRONTEND_URL, process.env.DASHBOARD_URL];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// Handling preflight requests
app.options('*', cors());
app.use((req, res, next) => {
    console.log('CORS middleware invoked');
    next();
});



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}));

app.use("/api/v1/message", messageRouter)
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);





dbConnection();

app.use(errorHandler);
export default app;