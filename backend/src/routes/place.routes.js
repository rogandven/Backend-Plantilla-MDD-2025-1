"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";
import {
    getPlaces,
    getPlaceById,
    createPlace,
    updatePlace,
    deletePlace,
} from "../controllers/place.controller.js";

const router = Router();

router.use(authenticateJwt);

router.get("/", getPlaces);
router.get("/:id", getPlaceById);

router.post("/", createPlace);
router.put("/:id", updatePlace);
router.delete("/:id", deletePlace);

export default router;