"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

import {
    getAsambleas,
    getAsambleaById,
    createAsamblea,
    updateAsamblea,
    deleteAsamblea,
} from "../controllers/asamblea.controller.js";

const router = Router();

router.use(authenticateJwt);

router.get("/", getAsambleas);
router.get("/:id", getAsambleaById);

router.post("/", isAdmin, createAsamblea);
router.put("/:id", isAdmin, updateAsamblea);
router.delete("/:id", isAdmin, deleteAsamblea);

export default router;