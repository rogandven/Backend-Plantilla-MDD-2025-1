"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";
import {
    getUrls,
    getUrlById,
    createUrl,
    updateUrl,
    deleteUrl,
} from "../controllers/url.controller.js";

const router = Router();

router.use(authenticateJwt);

router.get("/", getUrls);
router.get("/:id", getUrlById);

router.post("/", createUrl);
router.put("/:id", updateUrl);
router.delete("/:id", deleteUrl);

export default router;