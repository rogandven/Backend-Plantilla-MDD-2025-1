/*
"use strict";
import bcrypt from "bcrypt";

// Función helper para encriptar y contraseñas
export async function encryptPassword(password) {
  try {
    // Generar un salt y encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error en bcrypt.helper.js -> encryptPassword(): ", error);
    throw new Error("Error al encriptar la contraseña");
  }
}

// Función helper para comparar contraseñas
export async function comparePassword(password, receivedPassword) {
  try {
    return await bcrypt.compare(password, receivedPassword);
  } catch (error) {
    console.error("Error en bcrypt.helper.js -> comparePassword(): ", error);
    throw new Error("Error al comparar las contraseñas");
  }
}
*/

"use strict"; //se activa el modo estricto para evitar errores silenciosos y mejorar el rendimiento

//se importa la librería bcrypt para encriptar y comparar contraseñas
import bcrypt from "bcrypt";

/*
  Función helper: encryptPassword
  Se encarga de encriptar la contraseña de texto plano antes de guardarla en la BD
*/
export async function encryptPassword(password) {
  try {
    //se genera un "salt" (valor aleatorio) con 10 rondas de procesamiento
    const salt = await bcrypt.genSalt(10);
    //se retorna la contraseña encriptada usando el salt generado
    return await bcrypt.hash(password, salt);
  } catch (error) {
    //si ocurre un error, se registra en consola y se lanza una excepción personalizada
    console.error("Error en bcrypt.helper.js -> encryptPassword(): ", error);
    throw new Error("Error al encriptar la contraseña");
  }
}

/*
  Función helper: comparePassword
  Compara una contraseña ingresada (password) con la contraseña encriptada almacenada (receivedPassword)
  Retorna true si coinciden, false si no
*/
export async function comparePassword(password, receivedPassword) {
  try {
    //se compara la contraseña ingresada con la encriptada
    return await bcrypt.compare(password, receivedPassword);
  } catch (error) {
    //si ocurre un error, se registra en consola y se lanza una excepción personalizada
    console.error("Error en bcrypt.helper.js -> comparePassword(): ", error);
    throw new Error("Error al comparar las contraseñas");
  }
}
