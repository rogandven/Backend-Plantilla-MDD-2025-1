/*"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
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

"use strict"; 

//se importa la entidad User desde la carpeta de entidades
import User from "../entity/user.entity.js";
//se importa la fuente de datos (conexión a la base de datos)
import { AppDataSource } from "../config/configDb.js";
//se importa la función para encriptar contraseñas
import { encryptPassword } from "../helpers/bcrypt.helper.js";


/*
//función para obtener todos los usuarios del sistema
export async function getUsers(req, res) {
  try {
    //se accede al repositorio de la entidad User
    const userRepository = AppDataSource.getRepository(User);
    //se obtienen todos los usuarios registrados
    const users = await userRepository.find();
    //se responde con éxito y se envía la lista de usuarios
    res.status(200).json({ message: "Usuarios encontrados: ", data: users });
  } catch (error) {
    //si ocurre un error, se muestra por consola
    console.error("Error en user.controller.js -> getUsers(): ", error);
    //se responde con error 500 indicando problema interno
    res.status(500).json({ message: "Error interno del servidor." });
  }
}
*/


//función para obtener un usuario por su ID
export async function getUserById(req, res) {
  try {
    //se accede al repositorio de usuarios
    const userRepository = AppDataSource.getRepository(User);
    //se extrae el ID desde los parámetros de la URL
    const { id } = req.params;
    //se busca al usuario por su ID
    const user = await userRepository.findOne({ where: { id } });
    //si no se encuentra el usuario, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    //se responde con el usuario encontrado
    res.status(200).json({ message: "Usuario encontrado: ", data: user });
  } catch (error) {
    //si ocurre un error, se muestra por consola
    console.error("Error en user.controller.js -> getUserById(): ", error);
    //se responde con error interno
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

//ultima modificacion de la funcion
// función para obtener todos los usuarios, con soporte de filtro por query string
export async function getUsers(req, res) {
  try {
    const userRepository = AppDataSource.getRepository(User);

    // Lee filtros desde query params
    const { username, email, rut, role } = req.query;
    let query = userRepository.createQueryBuilder("user");

    if (username)
      query = query.andWhere("user.username ILIKE :username", { username: `%${username}%` });
    if (email)
      query = query.andWhere("user.email ILIKE :email", { email: `%${email}%` });
    if (rut)
      query = query.andWhere("user.rut ILIKE :rut", { rut: `%${rut}%` });
    if (role)
      query = query.andWhere("user.role = :role", { role });

    // Devuelve todos o los filtrados
    const users = await query.getMany();

    res.status(200).json({ message: "Usuarios encontrados: ", data: users });
  } catch (error) {
    console.error("Error en user.controller.js -> getUsers(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}


//función para actualizar un usuario por su ID
export async function updateUserById(req, res) {
  try {
    //se obtiene el repositorio de usuarios
    const userRepository = AppDataSource.getRepository(User);
    //se obtiene el ID del usuario desde los parámetros de la URL
    const { id } = req.params;
    //se extraen los datos a actualizar desde el body
    const { username, email, rut } = req.body;
    //se busca el usuario por su ID
    const user = await userRepository.findOne({ where: { id } });
    //si no se encuentra el usuario, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    //se definen los cambios a aplicar (si no se envía algún dato, se mantiene el anterior)
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
    //si no hubo ningún cambio, se retorna sin modificar nada
    if (!huboCambios) {
      return res.status(200).json({ message: "Sin cambios realizados.", data: user });
    }
    //se actualizan los datos del usuario
    user.username = cambios.username;
    user.email = cambios.email;
    user.rut = cambios.rut;
    //se guarda el usuario actualizado en la base de datos
    await userRepository.save(user);
    //se responde con éxito y los nuevos datos
    res.status(200).json({ message: "Usuario actualizado exitosamente.", data: user });
  } catch (error) {
    //si ocurre un error, se muestra por consola
    console.error("Error en user.controller.js -> updateUserById(): ", error);
    //se responde con error 500
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

//función para eliminar un usuario por su ID
export async function deleteUserById(req, res) {
  try {
    //se accede al repositorio de usuarios
    const userRepository = AppDataSource.getRepository(User);
    //se extrae el ID del usuario desde los parámetros
    const { id } = req.params;
    //se busca el usuario por su ID
    const user = await userRepository.findOne({ where: { id } });
    //si no se encuentra, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    //se elimina el usuario de la base de datos
    await userRepository.remove(user);
    //se responde con mensaje de éxito
    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    //si ocurre un error, se muestra por consola
    console.error("Error en user.controller.js -> deleteUserById(): ", error);
    //se responde con error interno
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

//función para obtener el perfil del usuario autenticado
export async function getProfile(req, res) {
  try {
    //se accede al repositorio de usuarios
    const userRepository = AppDataSource.getRepository(User);
    //se obtiene el correo del usuario autenticado
    const userEmail = req.user.email;
    //se busca al usuario por su correo electrónico
    const user = await userRepository.findOne({ where: { email: userEmail } });
    //si no se encuentra el usuario, se responde con error 404
    if (!user) {
      return res.status(404).json({ message: "Perfil no encontrado." });
    }
    //se construye un objeto sin incluir la contraseña
    const formattedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      rut: user.rut,
      role: user.role
    };
    //se responde con el perfil del usuario autenticado
    res.status(200).json({ message: "Perfil encontrado: ", data: formattedUser });
  } catch (error) {
    //si ocurre un error, se muestra por consola
    console.error("Error en user.controller -> getProfile(): ", error);
    //se responde con error interno
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

//se importa el esquema de validación para crear integrantes del CEE
import { registerCeeValidation } from "../validations/auth.validation.js";
//función para registrar un nuevo integrante del CEE (solo accesible para el administrador)
export async function registerCee(req, res) {
  try {
    //se accede al repositorio de usuarios
    const repo = AppDataSource.getRepository(User);
    //se valida el contenido del cuerpo de la solicitud usando Joi
    const { error } = registerCeeValidation.validate(req.body);
    //si la validación falla, se responde con error 400
    if (error) return res.status(400).json({ message: error.message });
    //se extraen los datos desde el cuerpo de la solicitud
    const { username, rut, email, password } = req.body;
    //se verifica si ya existe un usuario con el mismo correo, rut o nombre de usuario
    const dup = await repo.findOneBy([{ email }, { rut }, { username }]);
    if (dup) return res.status(409).json({ message: "Datos ya registrados" });
    //se crea un nuevo usuario con rol CEE y la contraseña encriptada
    const nuevo = repo.create({
      username,
      rut,
      email,
      password: await encryptPassword(password),
      role: "CEE"
    });

    //se guarda el nuevo usuario en la base de datos
    await repo.save(nuevo);
    //se responde con éxito
    res.status(201).json({ message: "Integrante CEE creado" });
  } catch (err) {
    //si ocurre un error, se muestra en consola
    console.error("registerCee:", err);
    //se responde con error interno
    res.status(500).json({ message: "Error al registrar integrante CEE" });
  }
}
