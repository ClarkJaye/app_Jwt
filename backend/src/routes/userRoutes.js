import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUserFromToken,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create-user", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser); 
router.get("/getUserData", getUserFromToken);

export default router;

