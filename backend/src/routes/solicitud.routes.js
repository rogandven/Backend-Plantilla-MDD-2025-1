/*
"use strict"; 

//se importa el módulo Router desde express para definir rutas
import { Router } from "express";

//se importan los controladores que manejan la lógica de las solicitudes
import {
  crearSolicitud,         
  obtenerSolicitudes,     
  gestionarSolicitud,     
  cambiarEstado,          
  eliminarSolicitud,      
  actualizarSolicitud     
} from "../controllers/solicitud.controller.js";

//se importa el middleware para autenticar mediante JWT
import { authenticateJwt } from "../middleware/authentication.middleware.js";

//import {isAdmin} from '../middleware/authorization.middleware.js';
//se crea una instancia del enrutador
const router = Router();
//se aplica el middleware de autenticación JWT a todas las rutas de este router
router.use(authenticateJwt);
//se define la ruta GET para obtener todas las solicitudes
router.get("/", obtenerSolicitudes);
//se define la ruta POST para crear una nueva solicitud
router.post("/", crearSolicitud);
//se define la ruta PUT para actualizar una solicitud por su id
router.put("/:id", actualizarSolicitud);
//se define la ruta PUT para tomar una solicitud en gestión por su id
router.put("/gestionar/:id", gestionarSolicitud);
//se define la ruta PUT para cambiar el estado de una solicitud por su id
router.put("/estado/:id", cambiarEstado);
//se define la ruta DELETE para eliminar una solicitud por su id
router.delete("/:id", eliminarSolicitud);
//se exporta el router para ser usado en el enrutador principal
export default router;
*/
/*
//anterior
"use strict";

import { Router } from "express";
import {
  crearSolicitud,
  obtenerSolicitudes,
  gestionarSolicitud,
  cambiarEstado,
  eliminarSolicitud,
  actualizarSolicitud,
} from "../controllers/solicitud.controller.js";

import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isCee, isOwner } from "../helpers/authorization.helper.js";

const router = Router();

router.use(authenticateJwt);

// ------------------------------------------------------------------
// Rutas disponibles para cualquier usuario autenticado
// ------------------------------------------------------------------
router.get("/", obtenerSolicitudes);
router.post("/", crearSolicitud);

// ------------------------------------------------------------------
// Solo el **dueño** (estudiante) puede editar si la solicitud no está tomada
// ------------------------------------------------------------------
router.put("/:id", isOwner, actualizarSolicitud);

// ------------------------------------------------------------------
// Solo integrantes del CEE pueden gestionar y cambiar estado
// ------------------------------------------------------------------
router.put("/gestionar/:id", isCee, gestionarSolicitud);
router.put("/estado/:id", isCee, cambiarEstado);

// ------------------------------------------------------------------
// DELETE:  • ADMIN siempre •  CEE siempre •  Estudiante solo si es dueño
// ------------------------------------------------------------------
router.delete("/:id", (req, res, next) => {
  if (req.user.role === "administrador") return next(); // admin ok
  if (req.user.role === "CEE") return next();            // CEE ok
  // Si es estudiante, validar propiedad + no gestionada
  return isOwner(req, res, next);
}, eliminarSolicitud);

export default router;

*/

/*
"use strict";

import { Router } from "express";
import {
  crearSolicitud,
  obtenerSolicitudes,
  cambiarEstado,
  eliminarSolicitud,
  actualizarSolicitud,
} from "../controllers/solicitud.controller.js";

import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isCee, isOwner } from "../helpers/authorization.helper.js";

const router = Router();

router.use(authenticateJwt);

router.get("/", obtenerSolicitudes);
router.post("/", crearSolicitud);

// Solo el dueño puede actualizar si no está tomada
router.put("/:id", isOwner, actualizarSolicitud);

//SOLO esta ruta es necesaria para gestionar
router.put("/estado/:id", isCee, cambiarEstado);

// DELETE con lógica de permisos
router.delete("/:id", (req, res, next) => {
  if (req.user.role === "administrador") return next();
  if (req.user.role === "CEE") return next();
  return isOwner(req, res, next);
}, eliminarSolicitud);

export default router;
*/

"use strict"; 

//se importa el módulo Router de Express para definir rutas separadas
import { Router } from "express";
//se importan las funciones del controlador de solicitudes para manejar las rutas
import {
  crearSolicitud,        //función para crear una nueva solicitud
  obtenerSolicitudes,    //función para listar todas las solicitudes
  cambiarEstado,         //función para cambiar el estado de una solicitud
  eliminarSolicitud,     //función para eliminar una solicitud
  actualizarSolicitud,   //función para actualizar una solicitud
} from "../controllers/solicitud.controller.js";
//se importa el middleware que verifica el token JWT y autentica al usuario
import { authenticateJwt } from "../middleware/authentication.middleware.js";
//se importan los middlewares de autorización: uno para validar si es CEE, otro si es dueño de la solicitud
import { isCee, isOwner } from "../helpers/authorization.helper.js";
//se crea un nuevo router para las rutas de solicitudes
const router = Router();
//se aplica el middleware de autenticación a todas las rutas de este archivo
router.use(authenticateJwt);
//ruta GET para obtener todas las solicitudes (según permisos del usuario)
router.get("/", obtenerSolicitudes);
//ruta POST para crear una nueva solicitud
router.post("/", crearSolicitud);
//ruta PUT para actualizar una solicitud específica solo si el usuario es su creador y aún no ha sido tomada
router.put("/:id", isOwner, actualizarSolicitud);
//ruta PUT para cambiar el estado de una solicitud (solo puede hacerlo un CEE)
router.put("/estado/:id", isCee, cambiarEstado);
//ruta DELETE para eliminar una solicitud
//si el usuario es administrador o CEE puede hacerlo directamente
//si no, se verifica que sea el creador con el middleware isOwner
router.delete("/:id", (req, res, next) => {
  if (req.user.role === "administrador") return next(); //permite si es admin
  if (req.user.role === "CEE") return next();           //permite si es CEE
  return isOwner(req, res, next);                       //si no, valida si es el dueño
}, eliminarSolicitud);
//se exporta el router para usarlo en el archivo principal
export default router;
