
/*"use strict";

import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";

// Middleware para verificar si el usuario es administrador
export async function isAdmin(req, res, next) {
  try {
    // Obtener el repositorio de usuarios
    const userRepository = AppDataSource.getRepository(User);

    // Buscar al usuario por su email desde el token decodificado
    const userFound = await userRepository.findOneBy({ email: req.user?.email });
    if (!userFound)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Verificar el rol del usuario
    if (userFound.role !== "administrador")
      return res.status(403).json({
        message:
          "Acceso denegado. Se requiere rol de administrador para esta acción.",
      });

    // El usuario tiene permiso, continuar
    next();

  } catch (error) {
    console.error("Error en middleware isAdmin:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
*/

/*
"use strict";

//se importa la entidad User desde la capa de entidad
import User from "../entity/user.entity.js";

//se importa la fuente de datos para acceder a la base de datos
import { AppDataSource } from "../config/configDb.js";

// Middleware para verificar si el usuario tiene rol de administrador
export async function isAdmin(req, res, next) {
  try {
    //obtener el repositorio de usuarios
    const userRepository = AppDataSource.getRepository(User);

    //buscar al usuario autenticado por su email (obtenido desde req.user por JWT)
    const userFound = await userRepository.findOneBy({ email: req.user?.email });

    //si no se encuentra el usuario, retornar error
    if (!userFound)
      return res.status(404).json({ message: "Usuario no encontrado" });

    //verificar si el rol del usuario es distinto a "administrador"
    if (userFound.role !== "administrador")
      return res.status(403).json({
        message:
          "Acceso denegado. Se requiere rol de administrador para esta acción.",
      });

    //si el usuario tiene rol válido, continuar
    next();

  } catch (error) {
    //si ocurre un error, retornar mensaje de error interno
    console.error("Error en middleware isAdmin:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
*/

"use strict";


export async function isAdmin(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ message: "Usuario no autenticado" });

    if (req.user.role !== "administrador") {
      return res.status(403).json({
        message: "Acceso denegado. Se requiere rol de administrador."
      });
    }
    next();
  } catch (err) {
    console.error("isAdmin:", err);
    res.status(500).json({ message: "Error interno" });
  }
}

export async function isAdminOrCee(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ message: "Usuario no autenticado" });

    
    if (req.user.role !== "administrador" && req.user.role !== "CEE") {
      return res.status(403).json({
        message: "Acceso denegado. Se requiere rol ADMIN o CEE."
      });
    }
    next();
  } catch (err) {
    console.error("isAdminOrCee:", err);
    res.status(500).json({ message: "Error interno" });
  }
}
