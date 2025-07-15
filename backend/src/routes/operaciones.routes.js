import { Router } from "express";
import { createOperacion,getOperacion,getOperacionResumenFinanciero } from "../controllers/operaciones.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.use(authenticateJwt);

router.post("/", createOperacion);
router.get("/", getOperacion);
router.get("/summary", getOperacionResumenFinanciero);

export default router;