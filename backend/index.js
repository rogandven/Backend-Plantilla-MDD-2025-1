/*"use strict"
import cors from "cors";
import express from "express";
import morgan from "morgan";
import indexRoutes from "./src/routes/index.routes.js";
import { PORT, HOST } from "./src/config/configEnv.js";
import { connectDB } from "./src/config/configDb.js";

// lo que yo implemente.
import { createUsers, createEstados } from "./src/config/initDb.js";

async function setupServer() {
  // Crea la instancia de Express
  const app = express();
  app.disable("x-powered-by");

  // Habilita el CORS para permitir solicitudes desde otros dominios (frontend)
  app.use(
    cors({
      credentials: true,
      origin: true,
    })
  );

  // Avisa a express que use JSON
  app.use(express.json());

  // Configura el middleware de morgan para registrar las peticiones HTTP
  app.use(morgan("dev"));

  // Configura las rutas de la API
  app.use("/api", indexRoutes);

  // Enciende el servidor
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${HOST}:${PORT}`);
  });
}

// Función para configurar la API
async function setupAPI() {
  try {
    // Conecta la base de datos
    await connectDB();
    // Crea los usuarios iniciales
    await createUsers();


    // Crea los estados iniciales del sistema (implementación adicional)
    await createEstados();
    // Configura el servidor
    await setupServer();
  } catch (error) {
    console.error("Error en index.js -> setupAPI(): ", error);
  }
}

// Inicia la configuración de la API
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((error) => console.log("Error en index.js -> setupAPI(): ", error));
*/

"use strict";

//se importan las dependencias externas necesarias
import cors from "cors";                    //se importa CORS para permitir peticiones entre dominios
import express from "express";              //se importa Express para crear el servidor HTTP
import morgan from "morgan";                //se importa Morgan para registrar las peticiones en consola
//se importan las rutas principales de la API
import indexRoutes from "./src/routes/index.routes.js";
//se importan las variables de entorno (puerto y host)
import { PORT, HOST } from "./src/config/configEnv.js";
//se importa la función para conectar a la base de datos
import { connectDB } from "./src/config/configDb.js";
//implementación propia: funciones para inicializar la BD con datos por defecto
import { createUsers, createEstados } from "./src/config/initDb.js";


 //setupServer()
 //se encarga de crear y configurar la instancia de Express
async function setupServer() {
  //se crea la app de Express
  const app = express();
  //se deshabilita el header X-Powered-By por seguridad
  app.disable("x-powered-by");
  //se configura CORS para aceptar solicitudes desde cualquier origen
  app.use(
    cors({
      credentials: true, //se permite el envío de credenciales (cookies, headers)
      origin: true,      //se permite cualquier origen
    })
  );
  //se indica a Express que procese el body de las peticiones como JSON
  app.use(express.json());
  //se configura Morgan en modo "dev" para mostrar logs de las peticiones HTTP
  app.use(morgan("dev"));
  //se monta el enrutador principal bajo /api
  app.use("/api", indexRoutes);
  //se inicia el servidor escuchando en el puerto especificado
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${HOST}:${PORT}`);
  });
}

//setupAPI()
//se encarga de conectar la base de datos, inicializar datos y arrancar el servidor
async function setupAPI() {
  try {
    //se conecta a la base de datos
    await connectDB();
    //se crean los usuarios iniciales (admin, CEE, etc.)
    await createUsers();
    //se crean los estados iniciales de la aplicación
    await createEstados();
    //se configura y arranca el servidor Express
    await setupServer();
  } catch (error) {
    //se muestra cualquier error que ocurra durante la configuración
    console.error("Error en index.js -> setupAPI(): ", error);
  }
}
//se inicia todo el proceso y se maneja cualquier error inesperado
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((error) => console.log("Error en index.js -> setupAPI(): ", error));
