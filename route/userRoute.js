import { createUser, loginUser } from "../controller/userController.js";
import express from "express";
const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUser);
export default router;
