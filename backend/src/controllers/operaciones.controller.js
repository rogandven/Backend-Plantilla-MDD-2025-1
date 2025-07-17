"use strict"
import { AppDataSource } from "../config/configDb.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { OperacionesEntity } from "../entity/Operaciones.entity.js";
import { OperacionesBodyValidation } from "../validations/operaciones.validation.js";

export async function createOperacion(req, res) {
    try {
        const operacionRepository = AppDataSource.getRepository("Operaciones");
        const { nombre_actividad, monto,tipo} = req.body;
        
        if (!nombre_actividad) {
            return res.status(400).json({ message: "el nombre de la actividad es necesario" });
        }
        
        var monto2 = parseFloat(monto);

        if (isNaN(monto2) || monto2 === 0) {
            return res.status(400).json({ message: "Debe ingresar un valor en el monto" });
        }
        // verifica que los daros esten bien 
        if (typeof nombre_actividad !== 'string' || nombre_actividad.trim() === '') {
            return res.status(400).json({ error: "Actividad inválida" });
        }
    
        if (isNaN(parseFloat(monto2))) {
            return res.status(400).json({ error: "Monto debe ser número" });
        }
        const tipoUpper = tipo?.toUpperCase();
        if (!['INGRESO', 'EGRESO'].includes(tipoUpper)) {
            return res.status(400).json({ error: "Tipo debe ser INGRESO o EGRESO" });
        }

        if (tipoUpper === 'EGRESO') {
            monto2 = (0 - (Math.abs(monto2)));
        } else {
            monto2 = (Math.abs(monto2));
        }

        const newOperacion = operacionRepository.create({
            nombre_actividad,
            monto: monto2,
            tipo:tipoUpper,
            userId: req.user.id
        });
        await operacionRepository.save(newOperacion);
        
        return res.status(201).json({ 
            message: "Operacion registrada exitosamente", 
            data: newOperacion 
        });
    } catch (error) {
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
            .select(["SUM(CASE WHEN operaciones.tipo = 'EGRESO' THEN -ABS(operaciones.monto) ELSE 0 END) AS egreso",
                "SUM(CASE WHEN operaciones.tipo = 'INGRESO' THEN operaciones.monto ELSE 0 END) AS ingreso",
                "SUM(operaciones.monto) AS balance"
            ])
            .getRawOne();

        return res.json({
            balanceTotal: parseFloat(result.balance) || 0
        
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al calcular el resumen financiero" });
    }
}

export async function updateOperacion(req, res) {
 try {
    var { id } = req.query;
    
    if (!id) {
        return res.status(400).json({ message: "Debe proporcionar el id de la actividad a actualizar" });
    }

    // Cambiar después
    id = Number(id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "El ID no es válido" });
    }

    const { body } = req;
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

    

    /*
    const { id } = req.query;
    const { body } = req;
    
    console.log(id);

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

    // Calcular nuevo monto si se está actualizando ingreso o egreso
    if (validatedData.ingreso !== undefined && validatedData.egreso !== undefined) {
        // Usar los valores nuevos si vienen en el body, o los existentes si no
        const nuevoIngreso = validatedData.ingreso !== undefined ? 
                            validatedData.ingreso : existeActividad.ingreso;
        const nuevoEgreso = validatedData.egreso !== undefined ? 
                            validatedData.egreso : existeActividad.egreso;
        
        // Calcular el monto neto
        validatedData.monto = nuevoIngreso - nuevoEgreso;
        console.log(validatedData.monto);
    }

    await operacionRepository.update(id, validatedData);

    // Obtener la operación actualizada para devolverla
    const operacionActualizada = await operacionRepository.findOneBy({ id: parseInt(id) });

    return res.status(200).json({ 
        message: "Operación actualizada exitosamente",
        data: operacionActualizada
    });
    */
     } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualiza la Operacion" });
     }
};




export async function deleteOperacion(req, res) {
    try {
        const { id, nombre } = req.query;

        const { error } = productQueryValidation.validate({ id, nombre });
        if (error) {
            return handleErrorClient(res, 400, "Error de validación", error.message);
        }

        if (!id) {
            return handleErrorClient(res, 400, "Debe proporcionar ID de la actividad a eliminar");
        }
        const [deletedProduct, errorMessage] = await deletedProduct({ id, nombre });

        if (errorMessage) return handleErrorClient(res, 404, errorMessage);

        handleSuccess(res, 200, "Operacion eliminada con éxito", deletedProduct);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
        return res.status(500).json({ message: "Error al eliminar la operacion" });
    }
}
