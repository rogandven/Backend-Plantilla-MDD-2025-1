import { Router } from "express";
import { createOperacion,getOperacion,getOperacionResumenFinanciero,updateOperacion,deleteOperacion } from "../controllers/operaciones.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

router.use(authenticateJwt);

router.post("/create", isAdmin, createOperacion);
router.get("/obtener", isAdmin, getOperacion);
router.get("/resumen", isAdmin, getOperacionResumenFinanciero);
router.put("/Actualizacion", isAdmin, updateOperacion);
router.delete("/Eliminar", isAdmin, deleteOperacion);
export default router;