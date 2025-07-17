/*"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
//
import {encryptPassword} from "../helpers/bcrypt.helper.js"

export async function getUsers(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar todos los usuarios
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    res.status(200).json({ message: "Usuarios encontrados: ", data: users });
  } catch (error) {
    console.error("Error en user.controller.js -> getUsers(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar un usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });

    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({ message: "Usuario encontrado: ", data: user });
  } catch (error) {
    console.error("Error en user.controller.js -> getUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}


export async function updateUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar un usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const { username, email, rut } = req.body;

    const user = await userRepository.findOne({ where: { id } });

    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Verificamos si se realizaron cambios reales
    const cambios = {
      username: username || user.username,
      email: email || user.email,
      rut: rut || user.rut,
    };

    const huboCambios =
      cambios.username !== user.username ||
      cambios.email !== user.email ||
      cambios.rut !== user.rut;

    // Si no hubo cambios, respondemos directamente
    if (!huboCambios) {
      return res.status(200).json({ message: "Sin cambios realizados.", data: user });
    }

    // Aplicar los cambios al objeto user
    user.username = cambios.username;
    user.email = cambios.email;
    user.rut = cambios.rut;

    // Guardar los cambios en la base de datos (esto actualiza updatedAt)
    await userRepository.save(user);

    res.status(200).json({ message: "Usuario actualizado exitosamente.", data: user });
  } catch (error) {
    console.error("Error en user.controller.js -> updateUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}


export async function deleteUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar el usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });

    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Eliminar el usuario de la base de datos
    await userRepository.remove(user);

    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    console.error("Error en user.controller.js -> deleteUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getProfile(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar el perfil del usuario autenticado
    const userRepository = AppDataSource.getRepository(User);
    const userEmail = req.user.email;
    const user = await userRepository.findOne({ where: { email: userEmail } });
    
    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Perfil no encontrado." });
    }

    // Formatear la respuesta excluyendo la contraseña
    const formattedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      rut: user.rut,
      role: user.role
    };

    res.status(200).json({ message: "Perfil encontrado: ", data: formattedUser });
  } catch (error) {
    console.error("Error en user.controller -> getProfile(): ", error);
    res.status(500).json({ message: "Error interno del servidor"})
  }
}

//ojo
import { registerCeeValidation } from "../validations/auth.validation.js";


export async function registerCee(req, res) {
  try {
    const repo = AppDataSource.getRepository(User);

   
    const { error } = registerCeeValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { username, rut, email, password } = req.body;

    
    const dup = await repo.findOneBy([{ email }, { rut }, { username }]);
    if (dup) return res.status(409).json({ message: "Datos ya registrados" });

    
    const nuevo = repo.create({
      username,
      rut,
      email,
      password: await encryptPassword(password),
      role: "CEE"
    });
    await repo.save(nuevo);

    res.status(201).json({ message: "Integrante CEE creado" });
  } catch (err) {
    console.error("registerCee:", err);
    res.status(500).json({ message: "Error al registrar integrante CEE" });
  }
}*/

/*
"use strict"; //se activa el modo estricto de JavaScript para evitar errores silenciosos y mejorar el rendimiento

//se importa la entidad User, correspondiente a la tabla de usuarios
import User from "../entity/user.entity.js";
//se importa la configuración de la base de datos
import { AppDataSource } from "../config/configDb.js";
//se importa la función para encriptar contraseñas
import { encryptPassword } from "../helpers/bcrypt.helper.js";

// Controlador para obtener todos los usuarios
export async function getUsers(req, res) {
  try {
    //se accede al repositorio de usuarios y se buscan todos los registros
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    //se envía la respuesta con la lista de usuarios encontrados
    res.status(200).json({ message: "Usuarios encontrados: ", data: users });
  } catch (error) {
    //si ocurre un error, se muestra por consola y se responde con error 500
    console.error("Error en user.controller.js -> getUsers(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Controlador para obtener un usuario por su ID
export async function getUserById(req, res) {
  try {
    //se obtiene el repositorio de usuarios y se busca por ID recibido desde params
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });
    //si no se encuentra el usuario, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    //se retorna el usuario encontrado
    res.status(200).json({ message: "Usuario encontrado: ", data: user });
  } catch (error) {
    //manejo de error interno
    console.error("Error en user.controller.js -> getUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Controlador para actualizar un usuario por su ID
export async function updateUserById(req, res) {
  try {
    //se obtiene el repositorio y se busca el usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const { username, email, rut } = req.body;
    const user = await userRepository.findOne({ where: { id } });
    //si el usuario no existe, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    //se preparan los nuevos valores a actualizar si existen cambios
    const cambios = {
      username: username || user.username,
      email: email || user.email,
      rut: rut || user.rut,
    };
    //se verifica si realmente hubo cambios
    const huboCambios =
      cambios.username !== user.username ||
      cambios.email !== user.email ||
      cambios.rut !== user.rut;
    //si no hay cambios, se devuelve la misma información sin actualizar
    if (!huboCambios) {
      return res.status(200).json({ message: "Sin cambios realizados.", data: user });
    }
    //se aplican los nuevos datos al objeto del usuario
    user.username = cambios.username;
    user.email = cambios.email;
    user.rut = cambios.rut;
    //se guarda el usuario actualizado en la base de datos
    await userRepository.save(user);
    //se retorna una respuesta exitosa con el usuario actualizado
    res.status(200).json({ message: "Usuario actualizado exitosamente.", data: user });
  } catch (error) {
    //manejo de error interno
    console.error("Error en user.controller.js -> updateUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Controlador para eliminar un usuario por su ID
export async function deleteUserById(req, res) {
  try {
    //se accede al repositorio y se busca el usuario por su ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });
    //si el usuario no se encuentra, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    //se elimina el usuario de la base de datos
    await userRepository.remove(user);
    //se responde indicando que se eliminó exitosamente
    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    //manejo de error interno
    console.error("Error en user.controller.js -> deleteUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Controlador para obtener el perfil del usuario autenticado
export async function getProfile(req, res) {
  try {
    //se accede al repositorio de usuarios y se busca por el email del usuario autenticado
    const userRepository = AppDataSource.getRepository(User);
    const userEmail = req.user.email;
    const user = await userRepository.findOne({ where: { email: userEmail } });
    //si no se encuentra el perfil, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Perfil no encontrado." });
    }
    //se formatea la respuesta para no incluir la contraseña
    const formattedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      rut: user.rut,
      role: user.role
    };
    //se devuelve el perfil del usuario
    res.status(200).json({ message: "Perfil encontrado: ", data: formattedUser });
  } catch (error) {
    //manejo de error interno
    console.error("Error en user.controller -> getProfile(): ", error);
    res.status(500).json({ message: "Error interno del servidor"})
  }
}
//se importa el esquema de validación específico para registrar CEE
import { registerCeeValidation } from "../validations/auth.validation.js";
// Controlador para registrar un usuario con rol CEE
export async function registerCee(req, res) {
  try {
    //se obtiene el repositorio de usuarios
    const repo = AppDataSource.getRepository(User);
    //se valida la información recibida con Joi
    const { error } = registerCeeValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    //se extraen los datos del cuerpo de la solicitud
    const { username, rut, email, password } = req.body;
    //se verifica si ya existen usuarios con los mismos datos
    const dup = await repo.findOneBy([{ email }, { rut }, { username }]);
    if (dup) return res.status(409).json({ message: "Datos ya registrados" });
    //se crea un nuevo usuario con rol CEE y se encripta la contraseña
    const nuevo = repo.create({
      username,
      rut,
      email,
      password: await encryptPassword(password),
      role: "CEE"
    });
    //se guarda el nuevo usuario en la base de datos
    await repo.save(nuevo);
    //se retorna respuesta exitosa
    res.status(201).json({ message: "Integrante CEE creado" });
  } catch (err) {
    //manejo de error interno
    console.error("registerCee:", err);
    res.status(500).json({ message: "Error al registrar integrante CEE" });
  }
}
*/

"use strict"; //se activa el modo estricto de JavaScript para evitar errores silenciosos y mejorar el rendimiento

//se importa la entidad User, correspondiente a la tabla de usuarios
import User from "../entity/user.entity.js";
//se importa la configuración de la base de datos
import { AppDataSource } from "../config/configDb.js";
//se importa la función para encriptar contraseñas
import { encryptPassword } from "../helpers/bcrypt.helper.js";
//se importa el esquema de validación específico para registrar CEE
import { registerCeeValidation } from "../validations/auth.validation.js";

// Controlador para obtener todos los usuarios
export async function getUsers(req, res) {
  try {
    //se accede al repositorio de usuarios y se buscan todos los registros
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    //se envía la respuesta con la lista de usuarios encontrados
    res.status(200).json({ message: "Usuarios encontrados: ", data: users });
  } catch (error) {
    //si ocurre un error, se muestra por consola y se responde con error 500
    console.error("Error en user.controller.js -> getUsers(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Controlador para obtener un usuario por su ID
export async function getUserById(req, res) {
  try {
    //se obtiene el repositorio de usuarios y se busca por ID recibido desde params
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });
    //si no se encuentra el usuario, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    //se retorna el usuario encontrado
    res.status(200).json({ message: "Usuario encontrado: ", data: user });
  } catch (error) {
    //manejo de error interno
    console.error("Error en user.controller.js -> getUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Controlador para actualizar un usuario por su ID
export async function updateUserById(req, res) {
  try {
    //se obtiene el repositorio y se busca el usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const { username, email, rut } = req.body;
    const user = await userRepository.findOne({ where: { id } });
    //si el usuario no existe, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    //se preparan los nuevos valores a actualizar si existen cambios
    const cambios = {
      username: username || user.username,
      email: email || user.email,
      rut: rut || user.rut,
    };
    //se verifica si realmente hubo cambios
    const huboCambios =
      cambios.username !== user.username ||
      cambios.email !== user.email ||
      cambios.rut !== user.rut;
    //si no hay cambios, se devuelve la misma información sin actualizar
    if (!huboCambios) {
      return res.status(200).json({ message: "Sin cambios realizados.", data: user });
    }
    //se aplican los nuevos datos al objeto del usuario
    user.username = cambios.username;
    user.email = cambios.email;
    user.rut = cambios.rut;
    //se guarda el usuario actualizado en la base de datos
    await userRepository.save(user);
    //se retorna una respuesta exitosa con el usuario actualizado
    res.status(200).json({ message: "Usuario actualizado exitosamente.", data: user });
  } catch (error) {
    //manejo de error interno
    console.error("Error en user.controller.js -> updateUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Controlador para eliminar un usuario por su ID
export async function deleteUserById(req, res) {
  try {
    //se accede al repositorio y se busca el usuario por su ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });
    //si el usuario no se encuentra, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    //se elimina el usuario de la base de datos
    await userRepository.remove(user);
    //se responde indicando que se eliminó exitosamente
    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    //manejo de error interno
    console.error("Error en user.controller.js -> deleteUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Controlador para obtener el perfil del usuario autenticado
export async function getProfile(req, res) {
  try {
    //se accede al repositorio de usuarios y se busca por el email del usuario autenticado
    const userRepository = AppDataSource.getRepository(User);
    const userEmail = req.user.email;
    const user = await userRepository.findOne({ where: { email: userEmail } });
    //si no se encuentra el perfil, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Perfil no encontrado." });
    }
    //se formatea la respuesta para no incluir la contraseña
    const formattedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      rut: user.rut,
      role: user.role
    };
    //se devuelve el perfil del usuario
    res.status(200).json({ message: "Perfil encontrado: ", data: formattedUser });
  } catch (error) {
    //manejo de error interno
    console.error("Error en user.controller -> getProfile(): ", error);
    res.status(500).json({ message: "Error interno del servidor"})
  }
}

// Controlador para registrar un usuario con rol CEE
export async function registerCee(req, res) {
  try {
    //se obtiene el repositorio de usuarios
    const repo = AppDataSource.getRepository(User);
    //se valida la información recibida con Joi
    const { error } = registerCeeValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    //se extraen los datos del cuerpo de la solicitud
    const { username, rut, email, password } = req.body;
    //se verifica si ya existen usuarios con los mismos datos
    const dup = await repo.findOneBy([{ email }, { rut }, { username }]);
    if (dup) return res.status(409).json({ message: "Datos ya registrados" });
    //se crea un nuevo usuario con rol CEE y se encripta la contraseña
    const nuevo = repo.create({
      username,
      rut,
      email,
      password: await encryptPassword(password),
      role: "CEE"
    });
    //se guarda el nuevo usuario en la base de datos
    await repo.save(nuevo);
    //se retorna respuesta exitosa
    res.status(201).json({ message: "Integrante CEE creado" });
  } catch (err) {
    //manejo de error interno
    console.error("registerCee:", err);
    res.status(500).json({ message: "Error al registrar integrante CEE" });
  }
}
