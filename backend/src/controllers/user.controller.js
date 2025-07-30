"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { isNull, assertValidId, ASSERTVALIDID_SUCCESS } from "../validations/other.validation.js";
import updateValidation from "../validations/auth.validation.js";
import { registerCeeValidation } from "../validations/auth.validation.js";

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

export async function getUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar un usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;

    assertValidIdResult = assertValidId(id, req, res);
    if (assertValidIdResult !== ASSERTVALIDID_SUCCESS) {
        return assertValidIdResult;
    }

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

    assertValidIdResult = assertValidId(id, req, res);
    if (assertValidIdResult !== ASSERTVALIDID_SUCCESS) {
        return assertValidIdResult;
    }

    const { error } = updateValidation.validate(req.body);
    if (error) return res.status(400).json({
      message: error.message
    });

    const { username, email, rut } = req.body;
    
    const user = await userRepository.findOne({ where: { id } });

    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Validar que al menos uno de los campos a actualizar esté presente
    user.username = username || user.username;
    user.email = email || user.email;
    user.rut = rut || user.rut;
    user.role = role || user.role;

    // Guardar los cambios en la base de datos
    await userRepository.save(user);

    res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente.", data: user });
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

    assertValidIdResult = assertValidId(id, req, res);
    if (assertValidIdResult !== ASSERTVALIDID_SUCCESS) {
        return assertValidIdResult;
    }

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

    if (isNull(userEmail)) {
      return res.status(400).json({ message: "Email no proporcionado." });
    }

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

