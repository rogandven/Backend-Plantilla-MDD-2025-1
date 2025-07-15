
/*"use strict";

import jwt from "jsonwebtoken";
import { SESSION_SECRET } from "../config/configEnv.js";
import { AppDataSource } from "../config/configDb.js";
import { UserEntity } from "../entity/user.entity.js";

// Middleware para autenticar JWT
export async function authenticateJwt(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verificar si el token está presente y es un Bearer Token
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Token no proporcionado" });

  const token = authHeader.split(" ")[1];

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, SESSION_SECRET);

    // Buscar el usuario completo en la base de datos
    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { email: decoded.email } });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Adjuntar el usuario completo al request
    req.user = user;
    next();

  } catch (error) {
    console.error("Error en middleware JWT:", error);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}
*/

"use strict";

//se importa el módulo jsonwebtoken para trabajar con tokens JWT
import jwt from "jsonwebtoken";

//se importa la clave secreta desde las variables de entorno
import { SESSION_SECRET } from "../config/configEnv.js";

//se importa la fuente de datos para acceder a la base de datos
import { AppDataSource } from "../config/configDb.js";

//se importa la entidad User para buscar al usuario en la base de datos
import { UserEntity } from "../entity/user.entity.js";

// Middleware para autenticar JWT
export async function authenticateJwt(req, res, next) {
  //obtener el token desde los headers de autorización
  const authHeader = req.headers.authorization;

  //verificar que el header exista y que el token comience con 'Bearer'
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Token no proporcionado" });

  //extraer el token JWT del encabezado
  const token = authHeader.split(" ")[1];

  try {
    //verifica y decodifica el token utilizando la clave secreta
    const decoded = jwt.verify(token, SESSION_SECRET);

    //obtener el repositorio de la entidad User
    const userRepository = AppDataSource.getRepository(UserEntity);

    //buscar el usuario completo en la base de datos por su email
    const user = await userRepository.findOne({ where: { email: decoded.email } });

    //si no se encuentra el usuario, retornar error
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    //adjuntar el objeto usuario completo al request para usar en otros middlewares o rutas
    req.user = user;

    //pasar al siguiente middleware o ruta
    next();

  } catch (error) {
    //si ocurre un error en la verificación del token, retornar error
    console.error("Error en middleware JWT:", error);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}

