import express from "express";
import { propiedadesController } from "../controllers/propiedadesController.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";
const router = express.Router();

router.get("/", protectedRoutes, propiedadesController.admin);

router.get("/crear", propiedadesController.crear);

router.post("/crear", protectedRoutes, propiedadesController.guardar);

export default router;
