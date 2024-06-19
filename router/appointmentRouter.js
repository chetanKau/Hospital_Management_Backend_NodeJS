import express from 'express';
import { postAppointment, getAllAppointment, updateAppointment, deleteAppointment } from '../controller/appointmentController.js';
import { isAdminAuthorized, isPatientAuthorized } from "../middlewares/authMiddleware.js"
const router = express.Router();


router.post("/post", isPatientAuthorized, postAppointment);
router.get("/getall", isAdminAuthorized, getAllAppointment);
router.put("/update/:id", isAdminAuthorized, updateAppointment);
router.delete("/delete/:id", isAdminAuthorized, deleteAppointment);


export default router;
