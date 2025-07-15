
"use strict";

//se importa el módulo Router desde express para definir rutas
import { Router } from "express";
//se importan las rutas relacionadas con autenticación
import authRoutes from "./auth.routes.js";
//se importan las rutas relacionadas con los usuarios
import userRoutes from "./user.routes.js";
//se importan las rutas relacionadas con las solicitudes
import solicitudRoutes from "./solicitud.routes.js";
//se crea una instancia del enrutador de express
const router = new Router();
//se asocian las rutas de autenticación bajo el prefijo '/auth'
router.use("/auth", authRoutes);
//se asocian las rutas de usuarios bajo el prefijo '/users'
router.use("/users", userRoutes);
//se asocian las rutas de solicitudes bajo el prefijo '/solicitudes'
router.use("/solicitudes", solicitudRoutes);
//se exporta el enrutador principal para ser utilizado en index.js
export default router;
