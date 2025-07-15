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
    console.log(rolUser);

    // Si el rol no es administrador, devolver un error 403
    if (rolUser !== "presidente"&& rolUser !== "vicepresidente" && rolUser !== "tesorero" && rolUser !== "secretaria" && rolUser !== "vocalia")
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
