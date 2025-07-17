"use strict";

import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

// Función para crear usuarios por defecto
// Se aplica sólo al iniciar la base de datos
export async function createUsers() {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const count = await userRepository.count();
        if (count > 0) return;
        const users = [
            {
                username: "Presidente",
                rut: "12345678-9",
                email: "presidente@ubiobio.cl",
                password: await encryptPassword("HalaMadridLukaModric2025"),
                role: "administrador"
            },
            {
                username: "Usuario",
                rut: "98765432-1",
                email: "usuario@ubiobio.cl",
                password: await encryptPassword("usuario12345"),
                role: "usuario"
            }
        ]

        console.log("Creando usuarios...");

        for (const user of users) {
            await userRepository.save((
                userRepository.create(user)
            ));
            console.log(`Usuario '${user.username}' creado exitosamente.`);
        }
    } catch (error) {
        console.error("Error al crear usuarios: ", error);
        process.exit(1);
    }
}