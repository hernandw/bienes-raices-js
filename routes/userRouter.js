import express from "express";
import {
  home,
  about,
  contact,
  login,
  register,
} from "../controller/userController.js";
const router = express.Router();

router.get("/", home);

router.get("/about", about);

router.get("/contact", contact);

router.get("/login", login);

router.get("/register", register);

export default router;
