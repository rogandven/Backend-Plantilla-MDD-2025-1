
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