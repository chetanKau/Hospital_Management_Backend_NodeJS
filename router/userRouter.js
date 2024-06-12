import { Router } from "express";
import {login, patientRegister} from "../controller/userController.js"

const router=Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);

export default router;