
/*"use strict";

//se importa la entidad User, es decir la tabla de usuarios
import User from "../entity/user.entity.js";
//se imorta la libreria para trabajar con los token de autentificacion JWT
import jwt from "jsonwebtoken";
//se importan las funciones para encriptar y comparar contraseñas
import { encryptPassword, comparePassword } from "../helpers/bcrypt.helper.js";
//se importa la conexion a la BD
import { AppDataSource } from "../config/configDb.js";
//se importa la clave secreta para generar tokens
import { SESSION_SECRET } from "../config/configEnv.js";
//se importan los esquemas de vaidacion para el registro y el login
import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation.js";

// Controlador de autenticación

export async function register(req, res) {
  try {
    //se accede al repositorio de usuario para trabajar con la BD
    const userRepository = AppDataSource.getRepository(User);
    //se extraen los datos enviados por el usuario desde el body
    const { username, rut, email, password } = req.body;
    //se realiza una validacion del formato y la presencia de los datos usando Joi
    const { error } = registerValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    
    //se verifica la existencia de usuarios registrados con el mismo correo
    const existingEmailUser = await userRepository.findOne({ where: { email } });
    if (existingEmailUser)
      return res.status(409).json({ message: "Correo ya registrado." });
    //se verifica la existencia de usuarios registrados con el mismo rut
    const existingRutUser = await userRepository.findOne({ where: { rut } });
    if (existingRutUser)
      return res.status(409).json({ message: "Rut ya registrado." });
    //se verifica la existencia de usuarios registrados con el mismo nombre de usuario
    const existingUsernameUser = await userRepository.findOne({ where: { username } });
    if (existingUsernameUser)
      return res.status(409).json({ message: "Nombre de usuario ya registrado." });

    //se crea un nuevo usuario encriptando la contraseña antes de guardarla. 
    const newUser = userRepository.create({
      username,
      email,
      rut,
      password: await encryptPassword(password),//se encripta la contraseña
    });
    //se guarda el nuevo usuario en la BD
    await userRepository.save(newUser);
    //se elimina el campo 'password' antes de enviar la respuesta 
    const { password: _, ...dataUser } = newUser;

    //se retorna la respuesta registro exitoso con los datos del nuevo usuario
    res.status(201).json({
      message: "Usuario registrado exitosamente!",
      data: dataUser,
    });
  } catch (error) {
    //si ocurre algun error se muestra por consola y se responde con error 500
    console.error("Error en auth.controller.js -> register(): ", error);
    return res.status(500).json({ message: "Error al registrar el usuario" });
  }
}

export async function login(req, res) {
  try {
    //se obtiene el repositorio de usuarios
    const userRepository = AppDataSource.getRepository(User);
    //se extraen los datos del formulario de inicio de sesion
    const { email, password } = req.body;
    //se valida el formato de los datos 
    const { error } = loginValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    //se busca al usuario por su correo en la BD
    const userFound = await userRepository.findOne({ where: { email } });
    //si no se encuentra el correo se lanza un error 404 indicando que no esta registrado
    if (!userFound)
      return res.status(404).json({ message: "El correo electrónico no está registrado" });
    //se compara la contraseña ingresada con la que esta registrada en BD
    const isMatch = await comparePassword(password, userFound.password);
    //si la contraseña es distinta a la que esta en BD se muestra un error 401 indicando que contraseña es incorrecta
    if (!isMatch)
      return res.status(401).json({ message: "La contraseña ingresada no es correcta" });
    
    //se define la informacion que se incluira en el token 
    const payload = {
      username: userFound.username,
      email: userFound.email,
      rut: userFound.rut,
      rol: userFound.role,
    };
    //se crea un token valido por un dia 
    const accessToken = jwt.sign(payload, SESSION_SECRET, { expiresIn: "1d" });
    //se da el token al usuario
    res.status(200).json({ message: "Inicio de sesión exitoso", accessToken });
  } catch (error) {
    //si ocurre algun error se muestra un error 500 se indica error al iniciar sesion.
    console.error("Error en auth.controller.js -> login(): ", error);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
}

export async function logout(req, res) {
  try {
    //se elimina la cookie jwt si existe
    res.clearCookie("jwt", { httpOnly: true });
    //se responde cerrrando la sesion correctamento
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al cerrar sesión" });
  }
}
*/

"use strict";

//se importa la entidad User, es decir la tabla de usuarios
import User from "../entity/user.entity.js";
//se imorta la libreria para trabajar con los token de autentificacion JWT
import jwt from "jsonwebtoken";
//se importan las funciones para encriptar y comparar contraseñas
import { encryptPassword, comparePassword } from "../helpers/bcrypt.helper.js";
//se importa la conexion a la BD
import { AppDataSource } from "../config/configDb.js";
//se importa la clave secreta para generar tokens
import { SESSION_SECRET } from "../config/configEnv.js";
//se importan los esquemas de vaidacion para el registro y el login
import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation.js";

// Controlador de autenticación
export async function register(req, res) {
  try {
    //se accede al repositorio de usuario para trabajar con la BD
    const userRepository = AppDataSource.getRepository(User);
    //se extraen los datos enviados por el usuario desde el body
    const { username, rut, email, password } = req.body;
    //se realiza una validacion del formato y la presencia de los datos usando Joi
    const { error } = registerValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    //se verifica la existencia de usuarios registrados con el mismo correo
    const existingEmailUser = await userRepository.findOne({ where: { email } });
    if (existingEmailUser)
      return res.status(409).json({ message: "Correo ya registrado." });
    //se verifica la existencia de usuarios registrados con el mismo rut
    const existingRutUser = await userRepository.findOne({ where: { rut } });
    if (existingRutUser)
      return res.status(409).json({ message: "Rut ya registrado." });
    //se verifica la existencia de usuarios registrados con el mismo nombre de usuario
    const existingUsernameUser = await userRepository.findOne({ where: { username } });
    if (existingUsernameUser)
      return res.status(409).json({ message: "Nombre de usuario ya registrado." });

    //se crea un nuevo usuario encriptando la contraseña antes de guardarla.
    const newUser = userRepository.create({
      username,
      email,
      rut,
      password: await encryptPassword(password), //se encripta la contraseña
      role: "ESTUDIANTE", //se fuerza el rol del usuario a ESTUDIANTE
    });

    //se guarda el nuevo usuario en la BD
    await userRepository.save(newUser);
    //se elimina el campo 'password' antes de enviar la respuesta
    const { password: _, ...dataUser } = newUser;

    //se retorna la respuesta registro exitoso con los datos del nuevo usuario
    res.status(201).json({
      message: "Usuario registrado exitosamente!",
      data: dataUser,
    });
  } catch (error) {
    //si ocurre algun error se muestra por consola y se responde con error 500
    console.error("Error en auth.controller.js -> register(): ", error);
    return res.status(500).json({ message: "Error al registrar el usuario" });
  }
}

export async function login(req, res) {
  try {
    //se obtiene el repositorio de usuarios
    const userRepository = AppDataSource.getRepository(User);
    //se extraen los datos del formulario de inicio de sesion
    const { email, password } = req.body;
    //se valida el formato de los datos
    const { error } = loginValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    //se busca al usuario por su correo en la BD
    const userFound = await userRepository.findOne({ where: { email } });
    //si no se encuentra el correo se lanza un error 404 indicando que no esta registrado
    if (!userFound)
      return res.status(404).json({ message: "El correo electrónico no está registrado" });
    //se compara la contraseña ingresada con la que esta registrada en BD
    const isMatch = await comparePassword(password, userFound.password);
    //si la contraseña es distinta a la que esta en BD se muestra un error 401 indicando que contraseña es incorrecta
    if (!isMatch)
      return res.status(401).json({ message: "La contraseña ingresada no es correcta" });

    //se define la informacion que se incluira en el token
    const payload = {
      username: userFound.username,
      email: userFound.email,
      rut: userFound.rut,
      role: userFound.role,
    };
    //se crea un token valido por un dia
    const accessToken = jwt.sign(payload, SESSION_SECRET, { expiresIn: "1d" });
    //se da el token al usuario
    res.status(200).json({ message: "Inicio de sesión exitoso", accessToken });
  } catch (error) {
    //si ocurre algun error se muestra un error 500 se indica error al iniciar sesion.
    console.error("Error en auth.controller.js -> login(): ", error);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
}

export async function logout(req, res) {
  try {
    //se elimina la cookie jwt si existe
    res.clearCookie("jwt", { httpOnly: true });
    //se responde cerrrando la sesion correctamento
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al cerrar sesión" });
  }
}

