import express from "express";
import { controller } from "../controllers/userController.js";
const router = express.Router();

router.get("/", controller.home);

router.get("/register", controller.registerForm);

router.get("/login", controller.loginForm);

router.get("/about", controller.about);

router.post("/register", controller.register);

router.get("/forget", controller.forget);





router.get("*", controller.notFound);

export default router;
