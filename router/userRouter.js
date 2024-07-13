import { Router } from "express";
import { login, patientRegister, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin, logoutUser, addNewDoctor } from "../controller/userController.js"
import { isAdminAuthorized, isPatientAuthorized } from "../middlewares/authMiddleware.js"

const router = Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addNew", addNewAdmin)
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthorized, getUserDetails)
router.get("/patient/me", isPatientAuthorized, getUserDetails)
router.get("/admin/logout", isAdminAuthorized, logoutAdmin)
router.get("/patient/logout", isPatientAuthorized, logoutUser)
router.post("/doctor/addNew", isAdminAuthorized, addNewDoctor)



export default router;