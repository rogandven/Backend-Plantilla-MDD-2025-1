import { Router } from "express";
import { createOperacion,getOperacion,getOperacionResumenFinanciero,updateOperacion,deleteOperacion } from "../controllers/operaciones.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.use(authenticateJwt);

router.post("/create", createOperacion);
router.get("/obtener", getOperacion);
router.get("/resumen", getOperacionResumenFinanciero);
router.put("/Actualizacion",updateOperacion);
router.delete("/Eliminar",deleteOperacion);
export default router;