"use strict";
import { Router } from "express";
import { createMeeting, getAllMeetings, getMeetingById, updateMeeting, deleteMeeting } from "../controllers/meeting.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { checkRole } from "../middleware/authorization.middleware.js";

const router = Router();

// Rutas protegidas que requieren autenticación y rol de CEE
router.post("/", authenticateJwt, checkRole(["administrador", "cee"]), createMeeting);
router.get("/", authenticateJwt, checkRole(["administrador", "cee"]), getAllMeetings);
router.get("/:id", authenticateJwt, checkRole(["administrador", "cee"]), getMeetingById);
router.put("/:id", authenticateJwt, checkRole(["administrador", "cee"]), updateMeeting);
router.delete("/:id", authenticateJwt, checkRole(["administrador", "cee"]), deleteMeeting);

export default router;
