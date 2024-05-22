import express from "express";
import {
  home,
  about,
  contact,
  login,
  register,
  registerForm,
  forget
  
} from "../controller/userController.js";
const router = express.Router();

router.get("/", home);

router.get("/about", about);

router.get("/contact", contact);

router.get("/login", login);

router.get("/register", registerForm);

router.get("/forget", forget);

router.post("/register", register);

export default router;
