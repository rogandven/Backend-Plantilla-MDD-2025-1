//permite activar el modo estricto de javascript para evitar errores
"use strict";

//se importan las entidades necesarias 
import User from "../entity/user.entity.js";
import Estado from "../entity/estado.entity.js";
//se importa la fuente de datos configurada que permite la conexion a la base de datos
import { AppDataSource } from "../config/configDb.js";
//se importa la función para encriptar la contraseña
import { encryptPassword } from "../helpers/bcrypt.helper.js";

// Función para crear usuarios por defecto
// Se aplica sólo al iniciar la base de datos
export async function createUsers() {
    try {
      //se obtiene el repositorio de la entidad User, permitiendo reaizar el crud
        const userRepository = AppDataSource.getRepository(User);
        //se cuentan los usuarios en la base de datos
        const count = await userRepository.count();
        //si ya hay usuarios registrados se detiene
        if (count > 0) return;
        const users = [
            {
                username: "Presidente",
                rut: "15128019-6",
                email: "presidente@ubiobio.cl",
                password: await encryptPassword("presidente123"),//Se encripta la contraseña
                role: "presidente"
            },
            {
                username: "Vicepresidente",
                rut: "19370788-2",
                email: "vicepresidente@ubiobio.cl",
                password: await encryptPassword("vicepresidente123"),//Se encripta la contraseña
                role: "vicepresidente"
            },
            {
                username: "Tesorero",
                rut: "10800422-3",
                email: "tesorero@ubiobio.cl",
                password: await encryptPassword("tesorero123"),//Se encripta la contraseña
                role: "tesorero"
            },
            {
                username: "Secretaria",
                rut: "18185910-5",
                email: "secretaria@ubiobio.cl",
                password: await encryptPassword("secretaria123"),//Se encripta la contraseña
                role: "secretaria"
            },
            {
                username: "Vocalia",
                rut: "57288988-2",
                email: "vocalia@ubiobio.cl",
                password: await encryptPassword("vocalia123"),//Se encripta la contraseña
                role: "vocalia"
            },
            {
                username: "Administrador",
                rut: "34537637-4",
                email: "administrador@ubiobio.cl",
                password: await encryptPassword("admin123"),//Se encripta la contraseña
                role: "administrador"
            },
            {
                username: "Estudiante",
                rut: "68884996-9",
                email: "estudiante@ubiobio.cl",
                password: await encryptPassword("usuario123"),
                role: "estudiante"
            },
            {//aqui esta el usuario gestor por asignar para evitar tener valores nulos en la BD
                username: "Gestor por asignar",
                rut: "000000000-0",
                email: "gestor.por.asignar@ubiobio.cl",
                password: await encryptPassword("gestor123"),
                role: "gestor"
            }
          
        ]

        console.log("Creando usuarios...");

        //se itera cada user de la lista users y los guarda en la BD
        for (const user of users) {
          //se crea la instancia y se guarda
            await userRepository.save((
                userRepository.create(user)
            ));
            //se imprime pr consola notificando la creacion de usuarios, en caso de que no existan.
            console.log(`Usuario '${user.username}' creado exitosamente.`);
        }
    } catch (error) {
      //si ocurre un error durante la ejecucion, se muestra el error por consola y termina el proceso
        console.error("Error al crear usuarios: ", error);
        process.exit(1);
    }
}

// Se crea la funcion para crear estados iniciales (pendiente, resuelta)
//esta funcion se ejecuta cada vez que se inicia la conexion al servidor
export async function createEstados() {
  try {
    //se obtiene el repositorio de la entidad Estado
    const estadoRepository = AppDataSource.getRepository(Estado);
    //se define una lista de estados que se crearan en caso de que no existan
    const estados = ["pendiente", "resuelta"];
    //se itera cada nombre de la lista estados 
    for (const nombre of estados) {
      //se busca en caso de que ya exista ese estado por el nombre
      const existe = await estadoRepository.findOne({ where: { nombre } });
      //si no existe el estado, lo crea 
      if (!existe) {
        const nuevoEstado = estadoRepository.create({ nombre });
        await estadoRepository.save(nuevoEstado);
        console.log(`Estado '${nombre}' creado exitosamente.`);
      //si ya existe el estado no lo vuelve a crear.
      //} else {
        //se imprime por consola notificando existencia de estados al iniciar el servidor
        console.log(`Estado '${nombre}' ya existe.`);
      }
    }
  } catch (error) {
    //si ocurre un error durante la ejecucion, se muestra el error por consola y termina el proceso
    console.error("Error al crear estados:", error);
    process.exit(1); 
  }
}