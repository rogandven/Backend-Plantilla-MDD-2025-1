
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

/*
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

*/

"use strict"; 

//se importa el módulo jsonwebtoken que permite trabajar con tokens JWT
import jwt from "jsonwebtoken";
//se importa la clave secreta para verificar los tokens desde las variables de entorno
import { SESSION_SECRET } from "../config/configEnv.js";
//se importa la configuración de conexión a la base de datos
import { AppDataSource } from "../config/configDb.js";
//se importa la entidad UserEntity que representa a los usuarios en la base de datos
import { UserEntity } from "../entity/user.entity.js";
//se define el middleware authenticateJwt para autenticar mediante tokens JWT
export async function authenticateJwt(req, res, next) {
  //se obtiene el encabezado de autorización que contiene el token
  const authHeader = req.headers.authorization;
  //se verifica que el encabezado exista y que comience con la palabra "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer "))
    //si no cumple, se devuelve error 401 indicando que no se proporcionó token
    return res.status(401).json({ message: "Token no proporcionado" });
  //se extrae el token eliminando la palabra "Bearer" y dejando solo el token
  const token = authHeader.split(" ")[1];
  try {
    //se verifica el token usando la clave secreta y se obtiene el contenido decodificado
    const decoded = jwt.verify(token, SESSION_SECRET);
    //se accede al repositorio de usuarios
    const userRepository = AppDataSource.getRepository(UserEntity);
    //se busca el usuario en la base de datos usando el correo extraído del token
    const user = await userRepository.findOne({ where: { email: decoded.email } });
    //si no se encuentra el usuario, se devuelve un error 404
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    //se adjunta el usuario completo al objeto req para utilizarlo en otras rutas o middlewares
    req.user = user;
    //si todo está bien, se llama al siguiente middleware o controlador
    next();
  } catch (error) {
    //si ocurre algún error en la verificación del token, se muestra por consola
    console.error("Error en middleware JWT:", error);
    //y se devuelve error 403 indicando que el token es inválido o ha expirado
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}
