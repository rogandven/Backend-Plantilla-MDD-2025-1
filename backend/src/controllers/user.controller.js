"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { isNull, assertValidId, ASSERTVALIDID_SUCCESS } from "../validations/other.validation.js";
import updateValidation from "../validations/auth.validation.js";
import { registerCeeValidation } from "../validations/auth.validation.js";
import { sendMail } from "../email/emailHandler.js";

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

export async function getUsers2() {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return users;
  } catch (error) {
    return null;
  }
}

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

export async function getUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar un usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;

    var assertValidIdResult = assertValidId(id, req, res);
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

    var assertValidIdResult = assertValidId(id, req, res);
    if (assertValidIdResult !== ASSERTVALIDID_SUCCESS) {
        return res.status(404).json({
          message: "No se encontró el ID"
        });
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

    var assertValidIdResult = assertValidId(id, req, res);
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

    res.status(200).json({ message: "Perfil encontrado: ", data: formattedUser });
  } catch (error) {
    console.error("Error en user.controller -> getProfile(): ", error);
    res.status(500).json({ message: "Error interno del servidor"})
  }
}

export async function sendMailToAllUsers(subject, text) {
  try {
    const users = await getUsers2();
    if (users !== null){
      users.map((user) => {
        try {
          sendMail(user.email, subject, text);
        } catch (error) {
          console.log(error);
        }
      })
    }
  } catch (error) {};
}