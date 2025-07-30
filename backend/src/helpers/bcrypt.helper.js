/*"use strict";
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
}*/

"use strict"; 

//se importa la librería bcrypt para manejo de contraseñas seguras
import bcrypt from "bcrypt";
//se declara la función helper encryptPassword para encriptar contraseñas
export async function encryptPassword(password) {
  try {
    //se genera un salt de 10 rondas para aumentar la seguridad del hash
    const salt = await bcrypt.genSalt(10);
    //se devuelve la contraseña encriptada usando el salt generado
    return await bcrypt.hash(password, salt);
  } catch (error) {
    //se muestra un mensaje de error en consola si ocurre un problema
    console.error("Error en bcrypt.helper.js -> encryptPassword(): ", error);
    //se lanza un error personalizado para el flujo de la aplicación
    throw new Error("Error al encriptar la contraseña");
  }
}
//se declara la función helper comparePassword para comparar contraseñas
export async function comparePassword(password, receivedPassword) {
  try {
    //se compara la contraseña de texto plano con la encriptada
    return await bcrypt.compare(password, receivedPassword);
  } catch (error) {
    //se muestra un mensaje de error en consola si ocurre un problema
    console.error("Error en bcrypt.helper.js -> comparePassword(): ", error);
    //se lanza un error personalizado indicando problema al comparar
    throw new Error("Error al comparar las contraseñas");
  }
}
