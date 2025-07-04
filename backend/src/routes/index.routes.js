"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import asambleaRoutes from "./asamblea.routes.js";
import placeRoutes from "./place.routes.js";
import urlRoutes from "./url.routes.js";

const router = new Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/asamblea", asambleaRoutes);
router.use("/places", placeRoutes);
router.use("/urls", urlRoutes);

export default router;