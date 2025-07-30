
"use strict";

//se importa Router desde express para definir rutas
import { Router } from "express";

//se importan los controladores relacionados a usuarios
import {
  getUsers,           
  getUserById,        
  getProfile,         
  updateUserById,     
  deleteUserById      
} from "../controllers/user.controller.js";

//se importa el middleware que autentica a través de JWT
import { authenticateJwt } from "../middleware/authentication.middleware.js";
//se importa el middleware que verifica si el usuario tiene rol de administrador
import { isAdmin } from "../middleware/authorization.middleware.js";
//
import { registerCee } from "../controllers/user.controller.js";

//se crea el enrutador para las rutas de usuario
const router = Router();
//se aplica el middleware de autenticación JWT a todas las rutas
router.use(authenticateJwt);
//se define una ruta pública accesible para cualquier usuario autenticado
//esta ruta permite consultar su propio perfil
router.get("/profile", getProfile);
//se aplica el middleware de autorización solo para administradores a las rutas siguientes
router.use(isAdmin);
//
router.post("/register-cee", registerCee);
//se define la ruta GET para obtener todos los usuarios (solo para admin)
router.get("/", getUsers);
//se define la ruta GET para obtener un usuario específico por ID (solo para admin)
router.get("/:id", getUserById);
//se define la ruta PUT para actualizar los datos de un usuario específico por ID (solo para admin)
router.put("/:id", updateUserById);
//se define la ruta DELETE para eliminar un usuario específico por ID (solo para admin)
router.delete("/:id", deleteUserById);
//se exporta el enrutador para ser usado por el enrutador principal
export default router;
