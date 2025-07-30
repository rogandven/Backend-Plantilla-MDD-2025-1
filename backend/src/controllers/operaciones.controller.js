"use strict"
import { AppDataSource } from "../config/configDb.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { OperacionesEntity } from "../entity/Operaciones.entity.js";
import { OperacionesBodyValidation,OperacionesQueryValidation} from "../validations/operaciones.validation.js";

export async function createOperacion(req, res) {
    try {
        const operacionRepository = AppDataSource.getRepository("Operaciones");
        const { nombre_actividad,ingreso,egreso} = req.body;
        
        if (!nombre_actividad) {
            return res.status(400).json({ message: "el nombre de la actividad es necesario" });
        }
        if (egreso === 0) {
            return res.status(400).json({ message: "el egreso es necesario" });
        }
        if (egreso <= 0) {  // <= Si no quieres permitir 0, cambia a `< 0`
            return res.status(400).json({ 
                message: 'El egreso debe ser mayor a 0' 
            });
        }
        // verifica que los datos esten bien 
        if (typeof nombre_actividad !== 'string' || nombre_actividad.trim() === '') {
            return res.status(400).json({ error: "Actividad inválida" });
        }
    
        if (isNaN(parseFloat(ingreso))) {
            return res.status(400).json({ error: "Ingreso debe ser número" });
        }
        if (isNaN(parseFloat(egreso))) {
            return res.status(400).json({ error: "egreso debe ser número" });
        }
        const ingresoNum = parseFloat(ingreso);
        const egresoNum = parseFloat(egreso);
            const monto=ingresoNum-egresoNum
           const newOperacion = operacionRepository.create({ 
            nombre_actividad,
            egreso:egresoNum,
            monto,
            ingreso:ingresoNum,
            userId: req.user.id
        });
        await operacionRepository.save(newOperacion);
        
        return res.status(201).json({ 
            message: "Operacion registrada exitosamente", 
            data: newOperacion 
        });
   }  catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar la Operacion" });
    }
}
// para conseguir el registro de las operaciones del usuario
export async function getOperacion(req, res) {
    try {
        // Obtiene el repositorio
        const  operacionRepository = AppDataSource.getRepository("Operaciones");
        
        // Busca todas las transacciones del usuario actual, ordenadas por fecha descendente
        const operacion = await operacionRepository.find({
            order: { createdAt: "DESC" } // Ordena por fecha más reciente
        });
        
        // Devuelve los resultados
        return res.status(200).json({ 
            message: "Operaciones encontradas", 
            data:operacion
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener las Operaciones" });
    }
} 
export async function getOperacionResumenFinanciero(req, res) {
    try {
        const operacionRepository = AppDataSource.getRepository("Operaciones");
        
        
        //por areglar
        const result = await operacionRepository
            .createQueryBuilder("operaciones") // Inicia el query builder
            .select(["SUM(CASE WHEN operaciones.egreso != NULL THEN -ABS(operaciones.egreso) ELSE 0 END) AS egreso",
                "SUM(CASE WHEN operaciones.ingreso != NULL THEN operaciones.ingreso ELSE 0 END) AS ingreso",
                "SUM(operaciones.monto) AS balance"
            ])
            .getRawOne();

        /* return res.json({
            balanceTotal: parseFloat(result.balance) || 0
        
        }); */
        return res.json({
            balance: parseFloat(result.balance) || 0,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al calcular el resumen financiero" });
    }
}

export async function updateOperacion(req, res) {
 try {
    const { id } = req.query;
    const { body } = req;
    
    if (!id) {
        return res.status(400).json({ message: "Debe proporcionar el id de la actividad a actualizar" });
    }

    // Validar el cuerpo de la solicitud
    const { error: bodyError, value: validatedData } = OperacionesBodyValidation.validate(body);

    if (bodyError) {
        const errores = bodyError.details.map(detail => ({
            campo: detail.path[0],
            error: detail.message
        }));
        return res.status(400).json({
            message: "Error de validación",
            errors: errores
        });
    }

    const operacionRepository = AppDataSource.getRepository("Operaciones");
    const existeActividad = await operacionRepository.findOneBy({ id: parseInt(id) });

    if (!existeActividad) {
        return res.status(404).json({ message: "Operación no encontrada" });
    }

    if (validatedData === undefined) {
        return res.status(400).json({ message: "Datos no definidos. Debe definir el ingreso o el egreso." });
    }

    // Calcular nuevo monto si se está actualizando ingreso o egreso
    // if (validatedData.ingreso !== undefined && validatedData.egreso !== undefined) {
        // Usar los valores nuevos si vienen en el body, o los existentes si no
        const nuevoIngreso = validatedData.ingreso !== undefined ? 
                            validatedData.ingreso : existeActividad.ingreso;
        const nuevoEgreso = validatedData.egreso !== undefined ? 
                            validatedData.egreso : existeActividad.egreso;
        
        // console.log(nuevoIngreso);
        // console.log(nuevoEgreso);

        // Calcular el monto neto
        validatedData.monto = nuevoIngreso - nuevoEgreso;
    // }

    await operacionRepository.update(id, validatedData);

    // Obtener la operación actualizada para devolverla
    const operacionActualizada = await operacionRepository.findOneBy({ id: parseInt(id) });

    return res.status(200).json({ 
        message: "Operación actualizada exitosamente",
        data: operacionActualizada
    });
     } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualiza la Operacion" });
     }
   
};




export async function deleteOperacion(req, res) {
    try {
        const { id } = req.query;

        const { error:Queryerror } = OperacionesQueryValidation.validate({ id });
        const operacionRepository = AppDataSource.getRepository("Operaciones");
        const existeActividad = await operacionRepository.findOneBy({ id: parseInt(id) });

        if (!existeActividad) {
            return res.status(404).json({ message: "Operación no encontrada" });
        }
        if (Queryerror) {
            const errores = Queryerror.details.map(detail => ({
                campo: detail.path[0],
                error: detail.message
            }));
            return res.status(400).json({
                message: "Error de validación",
                errors: errores
            });
        }
        await operacionRepository.delete(id)
        return res.status(200).json({ message: "Operacion eliminada con éxito" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la operacion" });
    }
}
