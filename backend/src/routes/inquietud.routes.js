"use strict";
import { Router } from "express";
import { getReclamos, createReclamo, getReclamoById, updateReclamo, deleteReclamo } from "../controllers/inquietud.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router= Router();

router.use(authenticateJwt);

router.get("/",getReclamos);
router.get("/:id", getReclamoById);

router.post("/", createReclamo)
router.put("/:id", isAdmin, updateReclamo);
router.delete("/:id", isAdmin,deleteReclamo);

export default router;