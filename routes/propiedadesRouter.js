import express from "express";
import { propiedadesController } from "../controllers/propiedadesController.js";
const router = express.Router();

router.get("/", propiedadesController.admin);

router.get("/crear", propiedadesController.crear);

router.post("/crear", propiedadesController.guardar);

export default router;
