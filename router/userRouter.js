import { Router } from "express";
import {patientRegister} from "../controller/userController.js"

const router=Router();

router.post("/patient/register",patientRegister)

export default router;