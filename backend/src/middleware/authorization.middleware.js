"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";

// Función middleware para verificar si el usuario es administrador
export async function isAdmin(req, res, next) {
  try {
    // Buscar el usuario en la base de datos
    const userRepository = AppDataSource.getRepository(User);
    const userFound = await userRepository.findOneBy({
      email: req.user?.email,
    });
    if (!userFound) return res.status(404).json("Usuario no encontrado");

    // Verificar el rol del usuario
    const rolUser = userFound.role;

    // Si el rol no es administrador, devolver un error 403
    if (rolUser !== "administrador")
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
