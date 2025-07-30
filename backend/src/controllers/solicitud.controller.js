import { globalIsAdmin } from "../algo/globalIsAdmin.js";

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
      email: "gestor.por.asignar@ubiobio.cl",
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
      solicitud.gestor.email !== "gestor.por.asignar@ubiobio.cl"
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
      solicitud.gestor.email === "gestor.por.asignar@ubiobio.cl"
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
    if ((!globalIsAdmin(req.user.role)) && (req.user.email !== solicitud.creador.email)) {
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
