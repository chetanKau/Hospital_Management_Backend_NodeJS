import { Router } from "express";
import { login, patientRegister, addNewAdmin, getAllDoctors, getUserDetails } from "../controller/userController.js"
import { isAdminAuthorized, isPatientAuthorized } from "../middlewares/authMiddleware.js"

const router = Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addNew", isAdminAuthorized, addNewAdmin)
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthorized, getUserDetails)
router.get("/patient/me", isPatientAuthorized, getUserDetails)




export default router;