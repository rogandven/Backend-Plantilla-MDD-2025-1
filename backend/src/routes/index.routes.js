"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import operacionesRoutes from "./operaciones.routes.js"
import inquietudesRoutes from "./inquietud.routes.js";
import meetingRoutes from "./meeting.routes.js";
import asambleaRoutes from "./asamblea.routes.js";
import solicitudRoutes from "./solicitud.routes.js";

const router = new Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/operaciones",operacionesRoutes);
router.use("/inquietudes", inquietudesRoutes);
router.use("/meetings", meetingRoutes);
router.use("/asamblea", asambleaRoutes);
router.use("/solicitudes", solicitudRoutes);

export default router;