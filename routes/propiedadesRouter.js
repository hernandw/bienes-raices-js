import express from "express";
import { propiedadesController } from "../controllers/propiedadesController.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";
const router = express.Router();

router.get("/", protectedRoutes, propiedadesController.admin);

router.get("/crear",protectedRoutes, propiedadesController.createForm);

router.post("/crear", protectedRoutes, propiedadesController.saveForm);

router.get("/edit/:id", protectedRoutes, propiedadesController.editForm);

router.put("/edit/:id",  protectedRoutes, propiedadesController.edit);

export default router;
