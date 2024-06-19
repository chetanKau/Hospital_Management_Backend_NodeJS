import express from 'express';
import { postAppointment } from '../controller/appointmentController.js';
import { isAdminAuthorized, isPatientAuthorized } from "../middlewares/authMiddleware.js"
const router = express.Router();


router.post("/post", isPatientAuthorized, postAppointment)


export default router;
