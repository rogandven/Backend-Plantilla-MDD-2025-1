
/*"use strict";

//se importan las entidades necesarias para trabajar
//se importa el archivo de configuracion de BD
import { AppDataSource } from "../config/configDb.js";
//se importa la entidad solicitud
import { SolicitudEntity } from "../entity/solicitud.entity.js";
//se importa la entidad estado
import { EstadoEntity } from "../entity/estado.entity.js";
//se importa la entidad usuario 
import User from "../entity/user.entity.js";
import {
  crearSolicitudValidation,
  updateSolicitudValidation,
} from "../validations/solicitud.validation.js";//se importan las validaciones 

export async function obtenerSolicitudes(req, res) {
  try {
    //se obtiene el repositorio de las solicitudes
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se extren filtros desde la URL: ?estado=x&carrera=y&fecha=z
    const { estado, carrera, fecha, descripcion } = req.query;
    //se crea una consulta personalizada usando QueryBuilder
    //se crea una consulta base con Join para incluir datos de estado, creador y gestor
    let query = solicitudRepo
      .createQueryBuilder("solicitud")
      .leftJoinAndSelect("solicitud.estado", "estado")
      .leftJoinAndSelect("solicitud.creador", "creador")
      .leftJoinAndSelect("solicitud.gestor", "gestor");
    //se realizan los filtros solo en el caso de que se entreguen
    if (estado) query = query.andWhere("estado.nombre = :estado", { estado });
    if (carrera) query = query.andWhere("solicitud.carrera ILIKE :carrera", { carrera: `%${carrera}%` });
    if (fecha) query = query.andWhere("DATE(solicitud.fecha_creacion) = :fecha", { fecha });
    if (descripcion) query = query.andWhere("solicitud.descripcion ILIKE :descripcion", { descripcion: `%${descripcion}%` });

    //se ejecuta la ultima consulta
    const resultados = await query.getMany();
    //se responde con las solicitudes filtradas 
    res.status(200).json({ message: "Solicitudes encontradas", data: resultados });
  } catch (err) {
    //en caso de un error se responde con un estado 500 indicando error al listar solicitudes.
    console.error("Error al listar solicitudes:", err);
    res.status(500).json({ message: "Error al listar solicitudes" });
  }
}

export async function obtenerSolicitudPorId(req, res) {
  try {
    //se obtiene el repositorio de las solicitudes 
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se obtiene el id de la solicitud desde la URL
    const { id } = req.params;
    //se realiza la busqueda de la solicitud por el id en la BD
    const solicitud = await solicitudRepo.findOne({ where: { id } });
    //si la solicitud no es encontrada se responde con un estado 404, indicando que la solicitud no se encontro
    if (!solicitud) return res.status(404).json({ message: "Solicitud no encontrada" });
    //si se encuentra la solicitud se rsponde con estado 200 mostrando los datos de esta solicitud 
    res.status(200).json({ message: "Solicitud encontrada", data: solicitud });
  } catch (error) {
    //en caso de un error se responde con un estado 500 indicando error al obtener solicitud.
    console.error("Error al obtener solicitud: ", error);
    res.status(500).json({ message: "Error al obtener solicitud" });
  }
}

export async function crearSolicitud(req, res) {
  try {
    //se obtienen los repositorios correspondientes para crear una solicitud
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const estadoRepo = AppDataSource.getRepository(EstadoEntity);
    const userRepo = AppDataSource.getRepository(User);

    //se valida la solicitud con Joi
    const { error } = crearSolicitudValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    //se busca el usuario registrado en la BD
    const creadorUsuario = await userRepo.findOne({ where: { email: req.user.email } });
    if (!creadorUsuario) return res.status(404).json({ message: "Usuario no encontrado" });
    //se busca el estado inicial 'pendiente'
    const estadoPendiente = await estadoRepo.findOneBy({ nombre: "pendiente" });
  
    
    //se crea la solicitud con los datos recibidos, su estado y el creador 
    const nueva = solicitudRepo.create({
      ...req.body,
      creador: creadorUsuario,
      estado: estadoPendiente,
    });

  //se busca el usuario que sera el gestor por default con correo fijo
  const gestorPorDefecto = await userRepo.findOne({ where: { email: "gestor.por.asignar@gmail.com" } });
  //se crea la solicitud con los datos recibidos del body, el creador, el estado y el gestor
  const nueva = solicitudRepo.create({
    ...req.body,
    creador: creadorUsuario,//se define el usuario autentificado como creador
    estado: estadoPendiente,//se define el estado inicial como pendiente
    gestor: gestorPorDefecto,//se asigna el gestor por defecto
});

    //se guarda la solicitud 
    await solicitudRepo.save(nueva);
    //se responde con un estado 201 indicando que se creo la solicitud mostrando sus datos
    res.status(201).json({ message: "Solicitud creada", data: nueva });
  } catch (error) {
    //en caso de un error se responde con un error 500 indicando error al crear solicitud
    console.error("Error al crear solicitud: ", error);
    res.status(500).json({ message: "Error al crear solicitud" });
  }
}

export async function actualizarSolicitud(req, res) {
  try {
    //se obtiene el repositorio de la entidad solicitud para realizar operaciones en la BD
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se extrae el parametro 'id' desde la URL /solicitudes/:id
    const { id } = req.params;
    //se valida que los datos enviados en el body de la solicitud cumplan el esquema definido
    const { error } = updateSolicitudValidation.validate(req.body);
    //si existen errores de validacion se responde con un estado 400
    if (error) return res.status(400).json({ message: error.message });
    //se realiza la busqueda de la solicitud en la BD por el id
    const solicitud = await solicitudRepo.findOne({ where: { id } });
    //si no se encuentra la solicitus se retorna un error 404
    if (!solicitud) return res.status(404).json({ message: "Solicitud no encontrada" });
    //se copian los datos del body dentro del objeto solicitud encontrado
    Object.assign(solicitud, req.body);
    //se actualiza la fecha de modificacion 
    solicitud.fecha_actualizacion = new Date();

    //se guarda la solicitud actualizada en la BD
    await solicitudRepo.save(solicitud);
    //se responde con un estado 200 con mensaje de exito y se muestran los datos actualizados
    res.status(200).json({ message: "Solicitud actualizada correctamente", data: solicitud });
  } catch (error) {
    //si existe algun error se muestra por consola y se responde con error 500
    console.error("Error al actualizar solicitud:", error);
    res.status(500).json({ message: "Error al actualizar solicitud" });
  }
}

export async function eliminarSolicitud(req, res) {
  try {
    //se obtiene el repositorio para acceder a las solicitudes
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se extrae el id desde la URL 
    const { id } = req.params;
    //se realiza la busqueda de la solicitud por el id en la BD
    const solicitud = await solicitudRepo.findOne({ where: { id } });
    //si no existe la solicitud se responde con error 404 
    if (!solicitud) return res.status(404).json({ message: "Solicitud no encontrada" });
    //se elimina la solicitud
    await solicitudRepo.remove(solicitud);
    //se confirma al usuario que la solicitud fue eliminada
    res.status(200).json({ message: "Solicitud eliminada correctamente" });
  } catch (error) {
    //en caso de existir errores se responde con error 500 
    console.error("Error al eliminar solicitud:", error);
    res.status(500).json({ message: "Error al eliminar solicitud" });
  }
}

export async function gestionarSolicitud(req, res) {
  try {
    //se obtiene el repositorio solicitud para realizar operaciones en la BD
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se obtiene el repositorio user para acceder a los datos de los usuarios en al BD
    const userRepo = AppDataSource.getRepository(User);
    //se obtiene el id de la solicitud a gestionar por la URL 
    const { id } = req.params;
    //se realiza la busqueda de la solicitud por id, incuyendo la relacion con el gestor
    const solicitud = await solicitudRepo.findOne({ where: { id }, relations: ["gestor"] });
    //si no se encuentra la solicitud se retorna un error 404 indicando que no se encontro la solicitud
    if (!solicitud) return res.status(404).json({ message: "Solicitud no encontrada" });
    
    
    //si la solicitud ya tiene un gestor asigando, no se puede tomar por lo tanto responde con un error 409
    if (solicitud.gestor) return res.status(409).json({ message: "Ya está en gestión" });
    

    //si la solicitud ya tiene un gestor asignado que NO sea el gestor por defecto
    //se impide tomar la solicitud para evitar sobreescribirla
    if (solicitud.gestor && solicitud.gestor.email !== "gestor.por.asignar@gmail.com") {
      return res.status(409).json({ message: "La solicitud ya tiene un gestor asignado." });
    }

    //se busca al usuario autentificado usando su email 
    const gestorUsuario = await userRepo.findOne({ where: { email: req.user.email } });
    //si no se encuentra el usuario se responde con error 404 y se indica que el usuario no se encontro 
    if (!gestorUsuario) return res.status(404).json({ message: "Usuario no encontrado" });
    
    //se asigna el gestor a la solicitud
    solicitud.gestor = gestorUsuario;
    //se guarda el cambio en la BD
    await solicitudRepo.save(solicitud);
    //se responde solicitud tomada para gestion con estado 200
    res.status(200).json({ message: "Solicitud tomada para gestión", data: solicitud });
  } catch (error) {
    //si existe algun error se responde con error 500 indicando error al genstionar solicitud
    console.error("Error al gestionar solicitud:", error);
    res.status(500).json({ message: "Error al gestionar solicitud" });
  }
}

export async function cambiarEstado(req, res) {
  try {
    //se obtiene el repositorio de la solicitud para operar con la BD
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se obtiene el repositorio de estado para operar con la BD
    const estadoRepo = AppDataSource.getRepository(EstadoEntity);
    //se obtiene el id de la solicitud desde la URL
    const { id } = req.params;
    //se obtiene el nombre del nuevo estado recibido en el body de la solicitud
    const { nuevoEstado } = req.body;
    //se busca la solicitus por el id
    const solicitud = await solicitudRepo.findOne({ where: { id } });
    //se busca el estado correspondiente por nombre por ejemplo 'resuelta' 
    const estado = await estadoRepo.findOneBy({ nombre: nuevoEstado });
    //si no existe la solitud o el estado se responde con un error 404 indicando que los datos son invalidos
    if (!solicitud || !estado) return res.status(404).json({ message: "Datos no válidos" });
    //se actualiza el estado de la solicitud
    solicitud.estado = estado;
    //se guarda el cambio en la base de datos
    await solicitudRepo.save(solicitud);
    //se responde con estado 200 indicando estado actualizado
    res.status(200).json({ message: "Estado actualizado", data: solicitud });
  } catch (error) {
    //si ocurre algun error se responde con error 500 indicando error al cambiar estado
    console.error("Error al cambiar estado:", error);
    res.status(500).json({ message: "Error al cambiar estado" });
  }
}*/
/*
"use strict";
//se importa la configuracion para conectar a la BD
import { AppDataSource } from "../config/configDb.js";
//se importa la entidad de solicitud
import { SolicitudEntity } from "../entity/solicitud.entity.js";
//se importa la entidad de estado
import { EstadoEntity } from "../entity/estado.entity.js";
//se importa la clase de repositorio de solicitud
import User from "../entity/user.entity.js";
//se importan las validaciones definidas 
import {
  crearSolicitudValidation,
  updateSolicitudValidation,
} from "../validations/solicitud.validation.js";

export async function obtenerSolicitudes(req, res) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const { estado, carrera, fecha, descripcion } = req.query;

    if (req.user.role === "usuario" || req.user.role === "ESTUDIANTE") {
      const propias = await solicitudRepo.find({
        where: { correo_estudiante: req.user.email },
      });
      return res
        .status(200)
        .json({ message: "Solicitudes encontradas", data: propias });
    }

    let query = solicitudRepo
      .createQueryBuilder("solicitud")
      .leftJoinAndSelect("solicitud.estado", "estado")
      .leftJoinAndSelect("solicitud.creador", "creador")
      .leftJoinAndSelect("solicitud.gestor", "gestor");

    if (estado) query = query.andWhere("estado.nombre = :estado", { estado });
    if (carrera)
      query = query.andWhere("solicitud.carrera ILIKE :carrera", {
        carrera: `%${carrera}%`,
      });
    if (fecha)
      query = query.andWhere("DATE(solicitud.fecha_creacion) = :fecha", {
        fecha,
      });
    if (descripcion)
      query = query.andWhere("solicitud.descripcion ILIKE :descripcion", {
        descripcion: `%${descripcion}%`,
      });

    const resultados = await query.getMany();
    res
      .status(200)
      .json({ message: "Solicitudes encontradas", data: resultados });
  } catch (error) {
    console.error("Error al listar solicitudes: ", error);
    res.status(500).json({ message: "Error al listar solicitudes" });
  }
}

export async function crearSolicitud(req, res) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const estadoRepo = AppDataSource.getRepository(EstadoEntity);
    const userRepo = AppDataSource.getRepository(User);

    const { error } = crearSolicitudValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const creadorUsuario = await userRepo.findOneBy({ email: req.user.email });
    if (!creadorUsuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const estadoPendiente = await estadoRepo.findOneBy({ nombre: "pendiente" });

    const gestorPorDefecto = await userRepo.findOneBy({
      email: "gestor.por.asignar@gmail.com",
    });

    const nuevaSolicitud = solicitudRepo.create({
      ...req.body,
      creador: creadorUsuario,
      estado: estadoPendiente,
      gestor: gestorPorDefecto,
    });

    await solicitudRepo.save(nuevaSolicitud);

    res
      .status(201)
      .json({ message: "Solicitud creada", data: nuevaSolicitud });
  } catch (error) {
    console.error("Error al crear solicitud: ", error);
    res.status(500).json({ message: "Error al crear solicitud" });
  }
}

export async function actualizarSolicitud(req, res) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);

    const { id } = req.params;
    const { error } = updateSolicitudValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const solicitud = await solicitudRepo.findOne({
      where: { id },
      relations: ["gestor", "creador"],
    });
    if (!solicitud)
      return res.status(404).json({ message: "Solicitud no encontrada" });

    if (solicitud.creador.email !== req.user.email)
      return res
        .status(403)
        .json({ message: "No eres el creador de esta solicitud" });

    if (
      solicitud.gestor &&
      solicitud.gestor.email !== "gestor.por.asignar@gmail.com"
    ) {
      return res.status(409).json({
        message:
          "La solicitud ya está siendo gestionada: no se permite editar.",
      });
    }

    Object.assign(solicitud, req.body);
    solicitud.fecha_actualizacion = new Date();
    await solicitudRepo.save(solicitud);

    res.status(200).json({
      message: "Solicitud actualizada correctamente",
      data: solicitud,
    });
  } catch (error) {
    console.error("Error al actualizar solicitud:", error);
    res.status(500).json({ message: "Error al actualizar solicitud" });
  }
}

export async function cambiarEstado(req, res) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const estadoRepo = AppDataSource.getRepository(EstadoEntity);
    const userRepo = AppDataSource.getRepository(User);

    const { id } = req.params;
    const { nuevoEstado, detalleResolucion } = req.body;

    if (detalleResolucion && detalleResolucion.trim().length < 10) {
      return res.status(400).json({
        message:
          "El detalle de resolución debe tener al menos 10 caracteres si se envía.",
      });
    }

    const solicitud = await solicitudRepo.findOne({
      where: { id },
      relations: ["gestor", "estado"],
    });
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    const estado = await estadoRepo.findOneBy({ nombre: nuevoEstado });
    if (!estado) {
      return res.status(404).json({ message: "Estado no válido" });
    }

    // Si aún no tiene un gestor asignado, se asigna el actual
    if (
      solicitud.gestor &&
      solicitud.gestor.email === "gestor.por.asignar@gmail.com"
    ) {
      const usuarioActual = await userRepo.findOneBy({ email: req.user.email });
      if (!usuarioActual) {
        return res.status(403).json({ message: "Usuario no autorizado" });
      }
      solicitud.gestor = usuarioActual;
    }

    // Verifica si el usuario actual es el gestor
    if (solicitud.gestor.email !== req.user.email) {
      return res
        .status(403)
        .json({ message: "No eres el gestor asignado a esta solicitud" });
    }

    solicitud.estado = estado;

    if (nuevoEstado.toLowerCase() === "resuelta") {
      solicitud.fecha_resolucion = new Date();
    }

    if (detalleResolucion) {
      solicitud.detalleResolucion = detalleResolucion;
    }

    await solicitudRepo.save(solicitud);

    res.status(200).json({
      message: "Solicitud gestionada correctamente",
      data: solicitud,
    });
  } catch (error) {
    console.error("Error al gestionar solicitud:", error);
    res.status(500).json({ message: "Error al gestionar solicitud" });
  }
}

export async function eliminarSolicitud(req, res) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const { id } = req.params;

    const solicitud = await solicitudRepo.findOne({
      where: { id },
      relations: ["creador"],
    });
    if (!solicitud)
      return res.status(404).json({ message: "Solicitud no encontrada" });

    if (
      req.user.role !== "CEE" &&
      req.user.role !== "administrador" &&
      req.user.email !== solicitud.creador.email
    ) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar esta solicitud" });
    }
    
    await solicitudRepo.remove(solicitud);
    res.status(200).json({ message: "Solicitud eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar solicitud:", error);
    res.status(500).json({ message: "Error al eliminar solicitud" });
  }
}*/

"use strict"; 

//se importa la configuración de conexión a la base de datos
import { AppDataSource } from "../config/configDb.js";
//se importa la entidad que representa las solicitudes
import { SolicitudEntity } from "../entity/solicitud.entity.js";
//se importa la entidad que representa los estados de las solicitudes
import { EstadoEntity } from "../entity/estado.entity.js";
//se importa la entidad que representa a los usuarios
import User from "../entity/user.entity.js";
//se importan las funciones de validación para crear y actualizar solicitudes
import {
  crearSolicitudValidation,
  updateSolicitudValidation,
} from "../validations/solicitud.validation.js";

/*

//funcion para obtener las solicitudes según el rol del usuario y filtros opcionales
export async function obtenerSolicitudes(req, res) {
  try {
    //se obtiene el repositorio de solicitudes
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se extraen los filtros enviados por query (estado, carrera, fecha, descripción)
    const { estado, carrera, fecha, descripcion } = req.query;
    //si el usuario es estudiante, solo puede ver sus propias solicitudes
    if (req.user.role === "usuario" || req.user.role === "ESTUDIANTE") {
      //se buscan las solicitudes del estudiante autenticado usando su correo
      const propias = await solicitudRepo.find({
        where: { correo_estudiante: req.user.email },
      });
      //se retorna la respuesta con las solicitudes del estudiante
      return res
        .status(200)
        .json({ message: "Solicitudes encontradas", data: propias });
    }
    //si es CEE o administrador, se crea una consulta personalizada
    let query = solicitudRepo
      .createQueryBuilder("solicitud") //se asigna alias "solicitud"
      .leftJoinAndSelect("solicitud.estado", "estado") //se une con la tabla de estado
      .leftJoinAndSelect("solicitud.creador", "creador") //se une con el creador
      .leftJoinAndSelect("solicitud.gestor", "gestor"); //se une con el gestor
    //se aplica filtro por estado si se envía
    if (estado) query = query.andWhere("estado.nombre = :estado", { estado });
    //se aplica filtro por carrera si se envía (búsqueda parcial, no exacta)
    if (carrera)
      query = query.andWhere("solicitud.carrera ILIKE :carrera", {
        carrera: `%${carrera}%`,
      });
    //se aplica filtro por fecha si se envía
    if (fecha)
      query = query.andWhere("DATE(solicitud.fecha_creacion) = :fecha", {
        fecha,
      });
    //se aplica filtro por descripción si se envía
    if (descripcion)
      query = query.andWhere("solicitud.descripcion ILIKE :descripcion", {
        descripcion: `%${descripcion}%`,
      });
    //se ejecuta la consulta y se obtienen las solicitudes
    const resultados = await query.getMany();
    //se retorna la respuesta con los resultados encontrados
    res
      .status(200)
      .json({ message: "Solicitudes encontradas", data: resultados });
  } catch (error) {
    //si ocurre un error, se muestra por consola
    console.error("Error al listar solicitudes: ", error);
    //se retorna error 500 al cliente
    res.status(500).json({ message: "Error al listar solicitudes" });
  }
}*/

export async function obtenerSolicitudes(req, res) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const { estado, descripcion, carrera, fecha, correo_estudiante, nombre_estudiante, filtro } = req.query;

    let query = solicitudRepo
      .createQueryBuilder("solicitud")
      .leftJoinAndSelect("solicitud.estado", "estado")
      .leftJoinAndSelect("solicitud.creador", "creador")
      .leftJoinAndSelect("solicitud.gestor", "gestor");

    //si es estudiante, filtra por su propio correo
    if (req.user.role === "usuario" || req.user.role === "ESTUDIANTE") {
      query = query.andWhere("solicitud.correo_estudiante = :correo", { correo: req.user.email });
    }

    //se filtro por estado
    if (estado) query = query.andWhere("estado.nombre = :estado", { estado });

    //se filtro por fecha
    if (fecha)
      query = query.andWhere("DATE(solicitud.fecha_creacion) = :fecha", { fecha });

    //busqueda descripción, carrera, correo, nombre, filtro general
    if (descripcion || carrera || correo_estudiante || nombre_estudiante || filtro) {
      const busqueda =
        filtro ||
        descripcion ||
        carrera ||
        correo_estudiante ||
        nombre_estudiante;

      query = query.andWhere(
        `(solicitud.descripcion ILIKE :busqueda
        OR solicitud.carrera ILIKE :busqueda
        OR solicitud.correo_estudiante ILIKE :busqueda
        OR solicitud.nombre_estudiante ILIKE :busqueda)`,
        { busqueda: `%${busqueda}%` }
      );
    }

    const resultados = await query.getMany();
    res.status(200).json({ message: "Solicitudes encontradas", data: resultados });
  } catch (error) {
    console.error("Error al listar solicitudes: ", error);
    res.status(500).json({ message: "Error al listar solicitudes" });
  }
}


//función para crear una nueva solicitud
export async function crearSolicitud(req, res) {
  try {
    //se obtiene el repositorio de solicitudes
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se obtiene el repositorio de estados
    const estadoRepo = AppDataSource.getRepository(EstadoEntity);
    //se obtiene el repositorio de usuarios
    const userRepo = AppDataSource.getRepository(User);
    //se valida la solicitud enviada usando Joi
    const { error } = crearSolicitudValidation.validate(req.body);
    //si hay error en la validación, se retorna mensaje de error
    if (error) return res.status(400).json({ message: error.message });
    //se busca al usuario que está creando la solicitud
    const creadorUsuario = await userRepo.findOneBy({ email: req.user.email });
    //si no se encuentra, se responde con error 404
    if (!creadorUsuario)
      return res.status(404).json({ message: "Usuario no encontrado" });
    //se obtiene el estado "pendiente" desde la base de datos
    const estadoPendiente = await estadoRepo.findOneBy({ nombre: "pendiente" });
    //se obtiene el usuario por defecto como gestor
    const gestorPorDefecto = await userRepo.findOneBy({
      email: "gestor.por.asignar@gmail.com",
    });

    //se crea una nueva solicitud con los datos recibidos
    const nuevaSolicitud = solicitudRepo.create({
      ...req.body, //se copian los campos desde el body
      creador: creadorUsuario, //se asigna el creador
      estado: estadoPendiente, //se asigna el estado pendiente
      gestor: gestorPorDefecto, //se asigna gestor por defecto
    });

    //se guarda la nueva solicitud en la base de datos
    await solicitudRepo.save(nuevaSolicitud);
    //se responde con mensaje de éxito
    res
      .status(201)
      .json({ message: "Solicitud creada", data: nuevaSolicitud });
  } catch (error) {
    //si ocurre un error, se muestra por consola
    console.error("Error al crear solicitud: ", error);
    //se retorna error 500
    res.status(500).json({ message: "Error al crear solicitud" });
  }
}

//función para actualizar una solicitud (solo si no ha sido tomada por un gestor)
export async function actualizarSolicitud(req, res) {
  try {
    //se obtiene el repositorio de solicitudes
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se extrae el id de la solicitud desde los parámetros de la URL
    const { id } = req.params;
    //se valida el contenido del cuerpo de la solicitud usando Joi
    const { error } = updateSolicitudValidation.validate(req.body);
    //si la validación falla, se retorna error 400 con el mensaje correspondiente
    if (error) return res.status(400).json({ message: error.message });
    //se busca la solicitud en la base de datos junto con su gestor y creador
    const solicitud = await solicitudRepo.findOne({
      where: { id }, //se busca por id
      relations: ["gestor", "creador"], //se incluyen las relaciones necesarias
    });

    //si no se encuentra la solicitud, se responde con error 404
    if (!solicitud)
      return res.status(404).json({ message: "Solicitud no encontrada" });
    //si el usuario autenticado no es el creador, se niega el permiso
    if (solicitud.creador.email !== req.user.email)
      return res
        .status(403)
        .json({ message: "No eres el creador de esta solicitud" });
    //si la solicitud ya tiene un gestor diferente al genérico, no puede editarse
    if (
      solicitud.gestor &&
      solicitud.gestor.email !== "gestor.por.asignar@gmail.com"
    ) {
      return res.status(409).json({
        message:
          "La solicitud ya fue resuelta. No se puede editar",
      });
    }
    //se actualizan los campos de la solicitud con los nuevos datos
    Object.assign(solicitud, req.body);
    //se actualiza la fecha de modificación con la fecha actual
    solicitud.fecha_actualizacion = new Date();
    //se guarda la solicitud modificada en la base de datos
    await solicitudRepo.save(solicitud);
    //se responde con éxito y se incluye la solicitud actualizada
    res.status(200).json({
      message: "Solicitud actualizada correctamente",
      data: solicitud,
    });
  } catch (error) {
    //si ocurre un error durante la ejecución, se muestra en consola
    console.error("Error al actualizar solicitud:", error);
    //se responde con error 500 indicando fallo interno
    res.status(500).json({ message: "Error al actualizar solicitud" });
  }
}

//función para cambiar el estado de una solicitud (solo si la gestiona el CEE)
export async function cambiarEstado(req, res) {
  try {
    //se obtiene el repositorio de solicitudes
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se obtiene el repositorio de estados
    const estadoRepo = AppDataSource.getRepository(EstadoEntity);
    //se obtiene el repositorio de usuarios
    const userRepo = AppDataSource.getRepository(User);
    //se extrae el id de la solicitud desde la URL
    const { id } = req.params;
    //se extraen los datos enviados en el cuerpo de la solicitud
    const { nuevoEstado, detalleResolucion } = req.body;
    //si se envía un detalle de resolución, se valida que tenga al menos 10 caracteres
    if (detalleResolucion && detalleResolucion.trim().length < 10) {
      return res.status(400).json({
        message:
          "El detalle de resolución debe tener al menos 10 caracteres si se envía.",
      });
    }

    //se busca la solicitud junto a sus relaciones de gestor y estado
    const solicitud = await solicitudRepo.findOne({
      where: { id },
      relations: ["gestor", "estado"],
    });
    //si no se encuentra la solicitud, se responde con error 404
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }
    //se busca en la base de datos el estado que se desea aplicar
    const estado = await estadoRepo.findOneBy({ nombre: nuevoEstado });
    //si no se encuentra el estado solicitado, se responde con error 404
    if (!estado) {
      return res.status(404).json({ message: "Estado no válido" });
    }
    //si la solicitud aún no tiene un gestor asignado, se asigna el actual
    if (
      solicitud.gestor &&
      solicitud.gestor.email === "gestor.por.asignar@gmail.com"
    ) {
      //se busca el usuario autenticado en la base de datos
      const usuarioActual = await userRepo.findOneBy({ email: req.user.email });
      //si no se encuentra, se niega el acceso
      if (!usuarioActual) {
        return res.status(403).json({ message: "Usuario no autorizado" });
      }
      //se asigna al usuario actual como gestor
      solicitud.gestor = usuarioActual;
    }
    //si el usuario actual no es el gestor asignado, se rechaza la acción
    if (solicitud.gestor.email !== req.user.email) {
      return res
        .status(403)
        .json({ message: "No eres el gestor asignado a esta solicitud" });
    }
    //se asigna el nuevo estado a la solicitud
    solicitud.estado = estado;
    //si el nuevo estado es "resuelta", se registra la fecha actual como fecha de resolución
    if (nuevoEstado.toLowerCase() === "resuelta") {
      solicitud.fecha_resolucion = new Date();
    }
    //si se envió un nuevo detalle de resolución, se actualiza
    if (detalleResolucion) {
      solicitud.detalleResolucion = detalleResolucion;
    }
    //se guarda la solicitud modificada en la base de datos
    await solicitudRepo.save(solicitud);
    //se responde con mensaje de éxito y la solicitud actualizada
    res.status(200).json({
      message: "Solicitud gestionada correctamente",
      data: solicitud,
    });
  } catch (error) {
    //si ocurre un error, se muestra por consola
    console.error("Error al gestionar solicitud:", error);
    //se responde con error 500 indicando problema interno
    res.status(500).json({ message: "Error al gestionar solicitud" });
  }
}
//función para eliminar una solicitud (puede hacerlo el creador, un CEE o un administrador)
export async function eliminarSolicitud(req, res) {
  try {
    //se obtiene el repositorio de solicitudes
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    //se extrae el id de la solicitud desde los parámetros de la URL
    const { id } = req.params;
    //se busca la solicitud por id e incluye la relación con su creador
    const solicitud = await solicitudRepo.findOne({
      where: { id },        //filtro por id
      relations: ["creador"] //se une con la entidad creador
    });
    //si la solicitud no existe, se responde con error 404
    if (!solicitud)
      return res.status(404).json({ message: "Solicitud no encontrada" });

    /* 
      Se valida si el usuario tiene permiso para eliminar:
      - rol CEE
      - rol administrador
      - o es el creador de la solicitud
    */
    if (
      req.user.role !== "CEE" &&               //no es CEE
      req.user.role !== "administrador" &&     //no es admin
      req.user.email !== solicitud.creador.email //no es el creador
    ) {
      //si no cumple ninguna condición, se rechaza la operación
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar esta solicitud" });
    }

    //se elimina la solicitud de la base de datos
    await solicitudRepo.remove(solicitud);
    //se responde con mensaje de éxito
    res.status(200).json({ message: "Solicitud eliminada correctamente" });
  } catch (error) {
    //si ocurre un error, se muestra por consola para depuración
    console.error("Error al eliminar solicitud:", error);
    //se devuelve error 500 indicando fallo interno del servidor
    res.status(500).json({ message: "Error al eliminar solicitud" });
  }
}
