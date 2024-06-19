import express from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import { isAdminAuthorized } from './../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAdminAuthorized, getAllMessages)





export default router;
