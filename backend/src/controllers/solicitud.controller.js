
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

"use strict";


import { AppDataSource } from "../config/configDb.js";
import { SolicitudEntity } from "../entity/solicitud.entity.js";
import { EstadoEntity } from "../entity/estado.entity.js";
import User from "../entity/user.entity.js";
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

export async function gestionarSolicitud(req, res) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const userRepo = AppDataSource.getRepository(User);
    const { id } = req.params;

    const solicitud = await solicitudRepo.findOne({
      where: { id },
      relations: ["gestor"],
    });
    if (!solicitud)
      return res.status(404).json({ message: "Solicitud no encontrada" });

    if (
      solicitud.gestor &&
      solicitud.gestor.email !== "gestor.por.asignar@gmail.com"
    ) {
      return res
        .status(409)
        .json({ message: "La solicitud ya tiene un gestor asignado." });
    }

    const gestorUsuario = await userRepo.findOneBy({ email: req.user.email });
    if (!gestorUsuario)
      return res.status(404).json({ message: "Usuario CEE no encontrado" });

    solicitud.gestor = gestorUsuario;
    await solicitudRepo.save(solicitud);

    res
      .status(200)
      .json({ message: "Solicitud tomada para gestión", data: solicitud });
  } catch (error) {
    console.error("Error al gestionar solicitud: ", error);
    res.status(500).json({ message: "Error al gestionar solicitud" });
  }
}
/*

export async function cambiarEstado(req, res) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const estadoRepo = AppDataSource.getRepository(EstadoEntity);

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
      relations: ["gestor"],
    });
    const estado = await estadoRepo.findOneBy({ nombre: nuevoEstado });

    if (!solicitud || !estado)
      return res.status(404).json({ message: "Datos no válidos" });

    if (solicitud.gestor.email !== req.user.email)
      return res
        .status(403)
        .json({ message: "No eres el gestor asignado a esta solicitud" });

    solicitud.estado = estado;
    if (detalleResolucion) solicitud.detalleResolucion = detalleResolucion;

    await solicitudRepo.save(solicitud);

    res
      .status(200)
      .json({ message: "Estado actualizado", data: solicitud });
  } catch (error) {
    console.error("Error al cambiar estado:", error);
    res.status(500).json({ message: "Error al cambiar estado" });
  }
}
*/


export async function cambiarEstado(req, res) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const estadoRepo = AppDataSource.getRepository(EstadoEntity);

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

    const estado = await estadoRepo.findOneBy({ nombre: nuevoEstado });

    if (!solicitud || !estado)
      return res.status(404).json({ message: "Datos no válidos" });

    // Validar que el usuario actual sea el gestor asignado
    if (solicitud.gestor.email !== req.user.email)
      return res
        .status(403)
        .json({ message: "No eres el gestor asignado a esta solicitud" });

    solicitud.estado = estado;

    // Si el nuevo estado es "resuelta", registra la fecha de resolución
    if (nuevoEstado.toLowerCase() === "resuelta") {
      solicitud.resueltaEn = new Date(); // Guarda timestamp actual
    }

    // Si se proporciona un detalle de resolución, lo actualiza
    if (detalleResolucion) {
      solicitud.detalleResolucion = detalleResolucion;
    }

    await solicitudRepo.save(solicitud);

    res
      .status(200)
      .json({ message: "Estado actualizado", data: solicitud });
  } catch (error) {
    console.error("Error al cambiar estado:", error);
    res.status(500).json({ message: "Error al cambiar estado" });
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
}
