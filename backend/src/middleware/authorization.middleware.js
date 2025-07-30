"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { globalIsAdmin } from "../algo/globalIsAdmin.js";

// Función middleware para verificar si el usuario es administrador
function lowercaseIfDefined(string) {
    if (string !== undefined && string !== null && ((typeof(string).toLowerCase()) === "string")) {
        return string.toLowerCase()
    } else {
        return "usuario";
    }
}

export async function isAdmin(req, res, next) {
  try {
    // Buscar el usuario en la base de datos
    const userRepository = AppDataSource.getRepository(User);
    const userFound = await userRepository.findOneBy({
      email: req.user?.email,
    });
    if (!userFound) return res.status(404).json("Usuario no encontrado");

    // Verificar el rol del usuario
    var rolUser = userFound.role;
    rolUser = lowercaseIfDefined(userFound.role);
    console.log(rolUser);

    // Si el rol no es administrador, devolver un error 403
    if (!globalIsAdmin(rolUser))
      return res
        .status(403)
        .json({
          message:
            "Error al acceder al recurso. Se requiere un rol de administrador para realizar esta acción.",
        });

    // Si el rol es administrador, continuar
    next();
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
}

// Función middleware para verificar el rol del usuario
export function checkRole(roles) {
  return async (req, res, next) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const userFound = await userRepository.findOneBy({
        email: req.user?.email,
      });

      if (!userFound) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (!roles.includes(userFound.role)) {
        return res.status(403).json({
          message: `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(
            ", "
          )}`,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor", error });
    }
  };
}

export async function isAdminOrCee(req, res, next) {
  try {
    //se verifica si el usuario está autenticado
    if (!req.user)
      return res.status(401).json({ message: "Usuario no autenticado" });

    //se verifica si el rol del usuario no es ni 'administrador' ni 'CEE'
    if (!globalIsAdmin(req.user.role)) {
      return res.status(403).json({
        message: "Acceso denegado. Se requiere rol ADMIN o CEE.",
      });
    }

    //si cumple con alguno de los dos roles, se continúa con la siguiente función
    next();
  } catch (err) {
    //se muestra el error en consola y se responde con error 500
    console.error("isAdminOrCee:", err);
    res.status(500).json({ message: "Error interno" });
  }
}
