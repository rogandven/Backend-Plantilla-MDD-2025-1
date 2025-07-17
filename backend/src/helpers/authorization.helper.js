
/*"use strict";


import { AppDataSource } from "../config/configDb.js";
import { SolicitudEntity } from "../entity/solicitud.entity.js";


export function isCee(req, res, next) {
  if (req.user.role !== "CEE") {
    return res
      .status(403)
      .json({ message: "Solo los integrantes del CEE pueden realizar esta acción." });
  }
  next(); // el usuario sí es CEE
}


export async function isOwner(req, res, next) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const solicitud = await solicitudRepo.findOne({
      where: { id: req.params.id },
      relations: ["creador", "gestor"],
    });

    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    // Verifica que el usuario sea el creador
    if (solicitud.creador.email !== req.user.email) {
      return res.status(403).json({ message: "No eres el creador de esta solicitud" });
    }

    // Verifica que no haya sido gestionada aún
    if (
      solicitud.gestor &&
      solicitud.gestor.email !== "gestor.por.asignar@gmail.com"
    ) {
      return res.status(409).json({
        message: "La solicitud ya está siendo gestionada y no puede ser modificada",
      });
    }

    next(); // es dueño y aún no está gestionada
  } catch (error) {
    console.error("Error en isOwner():", error);
    res.status(500).json({ message: "Error al verificar propiedad de la solicitud" });
  }
}
*/

/*
"use strict";

import { AppDataSource } from "../config/configDb.js";
import { SolicitudEntity } from "../entity/solicitud.entity.js";

// ---------------------------------------------------------------------------
// Middleware isCee: Verifica si el usuario autenticado es del CEE
// ---------------------------------------------------------------------------
export function isCee(req, res, next) {
  if (req.user.role !== "CEE") {
    return res
      .status(403)
      .json({ message: "Solo los integrantes del CEE pueden realizar esta acción." });
  }
  next(); // el usuario sí es CEE
}

// ---------------------------------------------------------------------------
// Middleware isOwner: Verifica si el usuario es dueño y no ha sido gestionada
// ---------------------------------------------------------------------------
export async function isOwner(req, res, next) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const solicitud = await solicitudRepo.findOne({
      where: { id: req.params.id },
      relations: ["creador", "gestor"],
    });

    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    if (solicitud.creador.email !== req.user.email) {
      return res.status(403).json({ message: "No eres el creador de esta solicitud" });
    }

    if (
      solicitud.gestor &&
      solicitud.gestor.email !== "gestor.por.asignar@gmail.com"
    ) {
      return res.status(409).json({
        message: "La solicitud ya está siendo gestionada y no puede ser modificada",
      });
    }

    next(); // es dueño y aún no está gestionada
  } catch (error) {
    console.error("Error en isOwner():", error);
    res.status(500).json({ message: "Error al verificar propiedad de la solicitud" });
  }
}
*/
/*
"use strict";

export function isCee(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  if (req.user.role !== "CEE") {
    return res
      .status(403)
      .json({ message: "Acceso denegado: se requiere rol CEE" });
  }

  next();
}

import { AppDataSource } from "../config/configDb.js";
import { SolicitudEntity } from "../entity/solicitud.entity.js";

export async function isOwner(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const solicitud = await solicitudRepo.findOne({
      where: { id: req.params.id },
      relations: ["creador"],
    });

    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    if (solicitud.creador.email !== req.user.email) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: no eres el propietario" });
    }

    
    req.solicitud = solicitud;
    next();
  } catch (err) {
    console.error("isOwner:", err);
    res.status(500).json({ message: "Error interno" });
  }
}
*/

"use strict"; //se activa el modo estricto para mejorar la calidad del código

//se importa la conexión a la base de datos
import { AppDataSource } from "../config/configDb.js";
//se importa la entidad Solicitud, que representa la tabla de solicitudes en la BD
import { SolicitudEntity } from "../entity/solicitud.entity.js";

/* 
  Middleware: isCee 
  Este middleware verifica si el usuario tiene el rol CEE
  Se usa para restringir acceso a rutas exclusivas para integrantes del CEE
*/
export function isCee(req, res, next) {
  //se verifica si hay un usuario autenticado en la petición
  if (!req.user) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  //se verifica si el usuario tiene rol CEE
  if (req.user.role !== "CEE") {
    return res
      .status(403)
      .json({ message: "Acceso denegado: se requiere rol CEE" });
  }

  //si pasa las validaciones, se permite continuar con la siguiente función
  next();
}

/* 
  Middleware: isOwner 
  Este middleware verifica si el usuario autenticado es el dueño (creador) de la solicitud
  Se usa para permitir que solo el autor pueda editar su propia solicitud
*/
export async function isOwner(req, res, next) {
  try {
    //se verifica si hay un usuario autenticado en la petición
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    //se accede al repositorio de solicitudes
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);

    //se busca la solicitud por su id y se incluye la relación con el creador
    const solicitud = await solicitudRepo.findOne({
      where: { id: req.params.id },
      relations: ["creador"],
    });

    //si la solicitud no existe, se responde con error 404
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    //se verifica si el correo del creador coincide con el del usuario autenticado
    if (solicitud.creador.email !== req.user.email) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: no eres el propietario" });
    }

    //se guarda la solicitud encontrada en la petición para usarla más adelante
    req.solicitud = solicitud;

    //se permite continuar con la siguiente función
    next();
  } catch (err) {
    //se captura cualquier error y se responde con error 500
    console.error("isOwner:", err);
    res.status(500).json({ message: "Error interno" });
  }
}
