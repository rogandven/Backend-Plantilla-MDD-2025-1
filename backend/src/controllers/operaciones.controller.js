"use strict"
import { AppDataSource } from "../config/configDb.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { OperacionesEntity } from "../entity/Operaciones.entity.js";
import { OperacionesBodyValidation,OperacionesQueryValidation} from "../validations/operaciones.validation.js";

export async function createOperacion(req, res) {

    try {
        const operacionRepository = AppDataSource.getRepository("Operaciones");
        var { nombre_actividad,monto, tipo} = req.body;
        
        if (!nombre_actividad) {
            return res.status(400).json({ message: "el nombre de la actividad es necesario" });
        }
        if (monto === 0) {
            return res.status(400).json({ message: "el monto es necesario" });
        }
        if (monto < 0) {  
            return res.status(400).json({ 
                message: 'El monto debe ser mayor a 0' 
            });
        }
        if (tipo.toUpperCase() !=="INGRESO" && tipo.toUpperCase() !=="EGRESO") {
            return res.status(400).json({ error: "Tipo debe ser INGRESO o EGRESO" });
        } 
        if (typeof nombre_actividad !== 'string' || nombre_actividad.trim() === '') {
            return res.status(400).json({ error: "Actividad inválida" });
        }
    
           const newOperacion = operacionRepository.create({ 
            nombre_actividad,
            monto:tipo === 'EGRESO' ? -Math.abs(monto) : Math.abs(monto),
            tipo : tipo.toUpperCase(),
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
            .select(["SUM(CASE WHEN operaciones.monto != NULL THEN -ABS(operaciones.monto) ELSE 0 END) AS monto",
                "SUM(operaciones.monto) AS balance",
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
        var montoAAgregar = 0;
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
                message: "Error de validacion",
                errors: errores
            });
        }

        const operacionRepository = AppDataSource.getRepository("Operaciones");
        const existeActividad = await operacionRepository.findOneBy({ id: parseInt(id) });

        if (!existeActividad) {
            return res.status(404).json({ message: "Operacion no encontrada" });
        }

        if (validatedData === undefined) {
            return res.status(400).json({ message: "Datos no definidos. Debe definir el ingreso o el egreso." });
        }    
        console.log(existeActividad);
         console.log(validatedData);
        if (existeActividad.monto == undefined) {
            existeActividad.monto = 0
        }
        console.log(validatedData.tipo);
        if (validatedData.tipo === "EGRESO") {
            montoAAgregar = (Math.abs(parseFloat(validatedData.monto)) * -1);
        } else {
            montoAAgregar = (Math.abs(parseFloat(validatedData.monto)));
        }
        existeActividad.monto = parseFloat(existeActividad.monto);
        console.log(existeActividad.monto + " + " + montoAAgregar + " = ");
        validatedData.monto = (existeActividad.monto + montoAAgregar);
        console.log(validatedData.monto);
        validatedData.monto = (existeActividad.monto + montoAAgregar);

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
