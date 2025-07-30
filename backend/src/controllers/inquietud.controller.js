"use strict";
import Reclamo from "../entity/inquietudes.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { createValidation,updateValidation } from "../validations/inquietud.validation.js";

export async function getReclamos(req, res) {
  try {
    
    const reclamoRepository = AppDataSource.getRepository(Reclamo);
    const reclamos = await reclamoRepository.find();

    res.status(200).json({ message: "quejas encontrados: ", data: reclamos });
  } catch (error) {
    console.error("Error al obtener quejas ", error);
    res.status(500).json({ message: "Error al obtener quejas." });
  }
}

export async function createReclamo(req, res) {
  try {
    
    const reclamoRepository = AppDataSource.getRepository(Reclamo);
    if (req.body.nombre_del_profesor === undefined) {
      return res.status(400).json({ message: 
        "Nombre del profesor no proporcionado"
      });
    }    
    if (req.body.descripcion === undefined) {
      return res.status(400).json({ message: 
        "Descripción no proporcionada"
      });
    }  
    if (req.body.ramo === undefined) {
      return res.status(400).json({ message: 
        "Asignatura no proporcionada"
      });
    }    

    const { nombre_del_profesor, descripcion,ramo } = req.body;
    const { error } = createValidation.validate(req.body);
    if (error) return res.status(400).json({ message: "Error al registrar reclamo", error: error});

    // Crear un nuevo libro y guardar en la base de datos
    const newReclamo = reclamoRepository.create({
      nombre_del_profesor,
      descripcion,
      ramo
    });
    await reclamoRepository.save(newReclamo);

    console.log(nombre_del_profesor);

    if (countReclamoByTeacher(nombre_del_profesor) >= 5) {
      // Por agregar
      console.log("Placeholder. Se debería citar a reunión.");
  }

    res.status(201).json({ message: "Reclamo registrado exitosamente!", data: newReclamo, });
  } catch (error) {
    console.error("Error al crear reclamo: ", error);
    return res.status(500).json({ message: "Error al crear reclamo." });
  }
}

export async function getReclamoById(req, res) {
  try {
    const reclamoRepository = AppDataSource.getRepository(Reclamo);
    const {id} =req.params
    const reclamo = await reclamoRepository.findOne({where: {id}});

    if(!reclamo) return res.staus(404).json({message:"reclamo no encontrado"});

    res.status(200).json({message:"reclamo encontrado" ,data: reclamo})
    
  } catch (error) {
    console.error("Error al mostrar reclamo: ", error);
    return res.status(500).json({ message: "Error al mostrar reclamo." });
  }
}

export async function updateReclamo (req,res) {
  try {
  const reclamoRepository= AppDataSource.getRepository(Reclamo);
  const {id}=req.params;
  const {nombre_del_profesor, descripcion, ramo}=req.body;
  const reclamo= await reclamoRepository.findOne({where: {id}});

    if (!reclamo) return res.status(404).json({message:"reclamo no encontrado "})

    const {error}= updateValidation.validate(req.body);
    if(error) return res.status(400).json({message: error.message})

    reclamo.nombre_del_profesor =nombre_del_profesor || reclamo.nombre_del_profesor
    reclamo.descripcion=descripcion || reclamo.descripcion
    reclamo.ramo=ramo || reclamo.ramo
  

    await reclamoRepository.save(reclamo);

    res.status(200).json({message:"reclamo actualizado con exito", data:reclamo})

  } catch (error) {
    console.error("Error al actualizar reclamo: ", error);
    return res.status(500).json({ message: "Error al actualizar reclamo." });
  }
 
}

export async function deleteReclamo (req,res) {
  try {
    const reclamoRepository=AppDataSource.getRepository(Reclamo);
    const { id }= req.params;
    const reclamo= await reclamoRepository.findOne({where: {id}})
    if(!reclamo) return res.status(404).json({message:"reclamo no encontrado"})

    await reclamoRepository.remove(reclamo);

    res.status(200).json({message:" reclamo eliminado con exito"});
  } catch (error) {
    console.error("Error al eliminar reclamo: ", error);
    return res.status(500).json({ message: "Error al eliminar reclamo." });
  }
}

export async function countReclamoByTeacher(nombre_del_profesor) {
  try {
      const reclamoRepository = AppDataSource.getRepository(Reclamo);
      var reclamoAmount = await reclamoRepository.count({ where: { nombre_del_profesor } });
      reclamoAmount = Number(reclamoAmount);
      if (isNaN(reclamoAmount)) {
          throw TypeError("reclamoAmount is not an integer");
      }
      console.log(reclamoAmount);
      return reclamoAmount;
  } catch (error) {
    console.log(error);
      return 0;
  }
}


