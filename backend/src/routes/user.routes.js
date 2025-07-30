/*
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
// se define la ruta DELETE para eliminar un usuario específico por ID (solo para admin)
router.delete("/:id", deleteUserById);
// se exporta el enrutador para ser usado por el enrutador principal
export default router;
*/

"use strict"; 

//se importa Router desde express para definir rutas
import { Router } from "express";
//se importan las funciones del controlador de usuarios
import {
  getUsers,           //función para obtener todos los usuarios
  getUserById,        //función para obtener un usuario por su ID
  getProfile,         //función para obtener el perfil del usuario autenticado
  updateUserById,     //función para actualizar un usuario por ID
  deleteUserById      //función para eliminar un usuario por ID
} from "../controllers/user.controller.js";
//se importa el middleware de autenticación JWT para proteger rutas
import { authenticateJwt } from "../middleware/authentication.middleware.js";
//se importa el middleware de autorización para verificar si el usuario es administrador
import { isAdmin } from "../middleware/authorization.middleware.js";
//se importa la función que permite registrar a un integrante del CEE
import { registerCee } from "../controllers/user.controller.js";
//se crea el enrutador para las rutas relacionadas a usuarios
const router = Router();
//se aplica el middleware de autenticación JWT a todas las rutas siguientes
router.use(authenticateJwt);
//se define la ruta GET /profile para que cualquier usuario autenticado vea su propio perfil
router.get("/profile", getProfile);
//se aplica el middleware isAdmin para que las siguientes rutas solo puedan ser accedidas por administradores
router.use(isAdmin);
//se define la ruta POST /register-cee para registrar nuevos integrantes del CEE (solo admin)
router.post("/register-cee", registerCee);
//se define la ruta GET / para obtener todos los usuarios del sistema (solo admin)
router.get("/", getUsers);
//se define la ruta GET /:id para obtener un usuario específico por su ID (solo admin)
router.get("/:id", getUserById);
//se define la ruta PUT /:id para actualizar datos de un usuario por ID (solo admin)
router.put("/:id", updateUserById);
//se define la ruta DELETE /:id para eliminar un usuario por ID (solo admin)
router.delete("/:id", deleteUserById);
//se exporta el router para que pueda ser utilizado en el archivo principal de rutas
export default router;
