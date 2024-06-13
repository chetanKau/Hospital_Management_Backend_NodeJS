import { Router } from "express";
import {login, patientRegister,addNewAdmin} from "../controller/userController.js"

const router=Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addNew",addNewAdmin)

export default router;