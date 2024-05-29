import express from "express";
import {
  home,
  about,
  contact,
  loginForm,
  register,
  registerForm,
  forget,
  confirmar
  
} from "../controller/userController.js";


const router = express.Router();

router.get("/", home);

router.get("/about", about);

router.get("/contact", contact);

router.get("/login", loginForm);

router.get("/register",  registerForm);

router.get("/forget", forget);

router.post("/register", register);

router.get('/confirmar/:token', confirmar)

export default router;
