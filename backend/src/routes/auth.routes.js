

"use strict";
//se importa el módulo Router desde express para definir rutas
import { Router } from "express";
//se importan las funciones del controlador de autenticación
import { login, register, logout } from "../controllers/auth.controller.js";
//se crea una instancia del enrutador de express
const router = new Router();
//se define la ruta POST para registrar un nuevo usuario y se enlaza con la función register
router.post("/register", register);
//se define la ruta POST para iniciar sesión y se enlaza con la función login
router.post("/login", login);
//se define la ruta POST para cerrar sesión y se enlaza con la función logout
router.post("/logout", logout);
//se exporta el enrutador para que pueda ser utilizado en otros archivos
export default router;
