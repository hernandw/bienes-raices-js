import express from "express";
import { controller } from "../controllers/userController.js";
const router = express.Router();

router.get("/", controller.home);

router.get("/register", controller.registerForm);

router.get("/login", controller.loginForm);

router.post("/login", controller.login);

router.get("/about", controller.about);

router.post("/register", controller.register);
router.get("/confirmar/:token", controller.checkToken); //confirma el token de registro

router.get("/forget", controller.forget); //carga formulario de olvido
router.post("/forgetPassword", controller.forgetPassword); //Procesa el formulario de olvido y borra el token

router.get("/olvide-password/:token", controller.checkTokenReset); //carga el formulario de cambio de contraseñas

router.post("/olvide-password/:token", controller.passwordReset); //Procesa el formulario de cambio de contraseñas

router.get("*", controller.notFound);

export default router;
