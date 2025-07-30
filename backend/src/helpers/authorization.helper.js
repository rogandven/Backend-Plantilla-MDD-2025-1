<<<<<<< frontend2seba

/*"use strict";
=======
"use strict";
>>>>>>> NEWprefinalNEW


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
<<<<<<< frontend2seba
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

    // Añadimos la solicitud al request por si el siguiente handler la necesita
    req.solicitud = solicitud;
    next();
  } catch (err) {
    console.error("isOwner:", err);
    res.status(500).json({ message: "Error interno" });
  }
}
*/

"use strict"; 

//se importa la configuracion de conexion con la base de datos
import { AppDataSource } from "../config/configDb.js";
//se importa la entidad SolicitudEntity para trabajar con solicitudes
import { SolicitudEntity } from "../entity/solicitud.entity.js";
//se define la función middleware isOwner que valida que el usuario autenticado sea el creador de la solicitud

//se define una función middleware que permite continuar solo si el usuario tiene rol CEE
export function isCee(req, res, next) {
  //se verifica si el usuario está autenticado
  if (!req.user) {
    //si no está autenticado, se retorna un error 401 (no autorizado)
    return res.status(401).json({ message: "Usuario no autenticado" });
  }
  //se verifica si el rol del usuario es diferente de "CEE"
  if (req.user.role !== "CEE") {
    //si el rol no es "CEE", se retorna un error 403 (prohibido)
    return res
      .status(403)
      .json({ message: "Acceso denegado: se requiere rol CEE" });
  }
  //si el usuario tiene el rol correcto, se continúa con la siguiente función del middleware
  next();
}

//se define la función middleware isOwner que valida que el usuario autenticado sea el creador de la solicitud
export async function isOwner(req, res, next) {
  try {
    //se verifica si el usuario está autenticado
    if (!req.user) {
      //si no está autenticado, se retorna un error 401 (no autorizado)
      return res.status(401).json({ message: "Usuario no autenticado" });
    }
    //se obtiene el repositorio de la entidad Solicitud
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se busca la solicitud por el id recibido en la URL, incluyendo los datos del creador
    const solicitud = await solicitudRepo.findOne({
      where: { id: req.params.id },
      relations: ["creador"],
    });

    //si no se encuentra la solicitud, se retorna error 404
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }
    //se compara el correo del creador con el del usuario autenticado
    if (solicitud.creador.email !== req.user.email) {
      //si no coinciden, se retorna error 403 indicando que no es el propietario
      return res
        .status(403)
        .json({ message: "Acceso denegado: no eres el propietario" });
    }
    //si es el propietario, se añade la solicitud al objeto req para usarla más adelante
    req.solicitud = solicitud;
    //se continúa con la siguiente función del middleware
    next();
  } catch (err) {
    //si ocurre un error en la ejecución, se muestra en consola
    console.error("isOwner:", err);
    //y se retorna error 500 indicando error interno del servidor
    res.status(500).json({ message: "Error interno" });
  }
}
=======

export {isCee, isOwner};
>>>>>>> NEWprefinalNEW
