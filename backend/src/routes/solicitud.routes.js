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

//se importan los helpers para verificar roles y permisos
import { isCee, isOwner } from "../helpers/authorization.helper.js";

//se crea una instancia del enrutador
const router = Router();

//se aplica el middleware de autenticación JWT a todas las rutas de este router
router.use(authenticateJwt);

//se define la ruta GET para obtener todas las solicitudes
router.get("/", obtenerSolicitudes);

//se define la ruta POST para crear una nueva solicitud
router.post("/", crearSolicitud);

//se define la ruta PUT para actualizar una solicitud por su id
//• se protege con isOwner → el estudiante solo puede modificar si es suya y no ha sido tomada
router.put("/:id", isOwner, actualizarSolicitud);

//se define la ruta PUT para tomar una solicitud en gestión por su id
//• solo puede hacerlo un integrante del CEE
router.put("/gestionar/:id", isCee, gestionarSolicitud);

//se define la ruta PUT para cambiar el estado de una solicitud por su id
//• solo puede hacerlo un integrante del CEE
router.put("/estado/:id", isCee, cambiarEstado);

//se define la ruta DELETE para eliminar una solicitud por su id
//• solo puede eliminar el CEE, admin o el creador
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

// 🔐 Todas las rutas requieren JWT válido
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


router.put("/:id", isOwner, actualizarSolicitud);


router.put("/estado/:id", isCee, cambiarEstado);

// DELETE con lógica de permisos
router.delete("/:id", (req, res, next) => {
  if (req.user.role === "administrador") return next();
  if (req.user.role === "CEE") return next();
  return isOwner(req, res, next);
}, eliminarSolicitud);

export default router;
*/

"use strict"; //se activa el modo estricto para evitar errores silenciosos y mejorar la calidad del código

//se importa la función Router desde express para definir las rutas del módulo
import { Router } from "express";

//se importan los controladores que manejan la lógica de las solicitudes
import {
  crearSolicitud,         //controlador para crear una solicitud
  obtenerSolicitudes,     //controlador para obtener todas las solicitudes
  //cambiarEstado,          //controlador para cambiar el estado de una solicitud
  eliminarSolicitud,      //controlador para eliminar una solicitud
  actualizarSolicitud     //controlador para actualizar una solicitud
} from "../controllers/solicitud.controller.js";

//se importa el middleware de autenticación para verificar el token JWT
import { authenticateJwt } from "../middleware/authentication.middleware.js";

//se importan los middlewares de autorización para verificar roles y propiedad
import { isCee, isOwner } from "../helpers/authorization.helper.js";

//se crea una nueva instancia del router de Express
const router = Router();

//se aplica el middleware de autenticación a todas las rutas de este router
router.use(authenticateJwt);

//ruta GET para obtener todas las solicitudes (con filtros si se envían)
router.get("/", obtenerSolicitudes);

//ruta POST para crear una nueva solicitud
router.post("/", crearSolicitud);

//ruta PUT para actualizar una solicitud (solo si es el dueño y no ha sido tomada)
//se aplica el middleware isOwner antes de llamar al controlador
router.put("/:id", isOwner, actualizarSolicitud);

//ruta PUT para cambiar el estado de una solicitud (solo miembros del CEE pueden hacerlo)
//se aplica el middleware isCee
//router.put("/estado/:id", isCee, cambiarEstado);

//ruta DELETE para eliminar una solicitud
//puede hacerlo el administrador, un CEE o el propio dueño
router.delete("/:id", 
  (req, res, next) => {
    //si el usuario es administrador, se permite
    if (req.user.role === "administrador") return next();
    //si el usuario es CEE, también se permite
    if (req.user.role === "CEE") return next();
    //si no es ninguno de los anteriores, se verifica si es el dueño
    return isOwner(req, res, next);
  },
  eliminarSolicitud //controlador que realiza la eliminación
);

//se exporta el router para usarlo en el archivo principal de rutas
export default router;
