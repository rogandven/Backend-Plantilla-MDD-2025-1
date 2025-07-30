"use strict";


import { AppDataSource } from "../config/configDb.js";
import { SolicitudEntity } from "../entity/solicitud.entity.js";


export function isCee(req, res, next) {
  if (req.user.role !== "CEE") {
    return res
      .status(403)
      .json({ message: "Solo los integrantes del CEE pueden realizar esta acción." });
  }
  next(); // el usuario sí es CEE
}


export async function isOwner(req, res, next) {
  try {
    const solicitudRepo = AppDataSource.getRepository(SolicitudEntity);
    const solicitud = await solicitudRepo.findOne({
      where: { id: req.params.id },
      relations: ["creador", "gestor"],
    });

    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    // Verifica que el usuario sea el creador
    if (solicitud.creador.email !== req.user.email) {
      return res.status(403).json({ message: "No eres el creador de esta solicitud" });
    }

    // Verifica que no haya sido gestionada aún
    if (
      solicitud.gestor &&
      solicitud.gestor.email !== "gestor.por.asignar@gmail.com"
    ) {
      return res.status(409).json({
        message: "La solicitud ya está siendo gestionada y no puede ser modificada",
      });
    }

    next(); // es dueño y aún no está gestionada
  } catch (error) {
    console.error("Error en isOwner():", error);
    res.status(500).json({ message: "Error al verificar propiedad de la solicitud" });
  }
}

export default {isCee, isOwner};
