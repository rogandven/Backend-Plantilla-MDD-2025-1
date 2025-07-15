"use strict"
import { AppDataSource } from "../config/configDb.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";

export async function createOperacion(req, res) {
    try {
        const operacionRepository = AppDataSource.getRepository("Operacion");
        const { actividad, monto,tipo} = req.body;
        
        if (!actividad) {
            return res.status(400).json({ message: "el nombre de la actividad es necesario" });
        }
        
        if (monto === 0) {
            return res.status(400).json({ message: "Debe ingresar un valor en el monto" });
        }
        const newOperacion = operacionRepository.create({
            actividad,
            monto: tipo === 'egreso',
            userId: req.user.id
        });
        // verifica que los daros esten bien 
        if (typeof actividad !== 'string' || actividad.trim() === '') {
            return res.status(400).json({ error: "Actividad inválida" });
        }
    
        if (isNaN(parseFloat(monto))) {
            return res.status(400).json({ error: "Monto debe ser número" });
        }
    
        if (!['INGRESO', 'EGRESO'].includes(tipo)) {
            return res.status(400).json({ error: "Tipo debe ser INGRESO o EGRESO" });
        }
        await operacionRepository.save(newOperacion);
        
        return res.status(201).json({ 
            message: "Operacion registrada exitosamente", 
            data: newOperacion 
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al registrar la Operacion" });
    }
}
// para conseguir el registro de las operaciones del usuario
export async function getOperacion(req, res) {
    try {
        // Obtiene el repositorio
        const  operacionRepository = AppDataSource.getRepository(" Operacion");
        
        // Busca todas las transacciones del usuario actual, ordenadas por fecha descendente
        const operacion = await operacionnRepository.find({
            where: { userId: req.user.id }, // Filtra por usuario
            order: { fecha: "DESC" } // Ordena por fecha más reciente
        });
        
        // Devuelve los resultados
        return res.status(200).json({ 
            message: "Operaciones encontradas", 
            data: Operacion
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener las Operaciones" });
    }
} 
export async function getOperacionResumenFinanciero(req, res) {
    try {
        const operacionRepository = AppDataSource.getRepository("Operacion");
        
        // QueryBuilder para cálculos agregados
        const result = await operacionRepository
            .createQueryBuilder("Operacion") // Inicia el query builder
            .select("SUM(Operacion.monto)", "balance")
            .where("Operacion.userId = :userId", { userId: req.user.id })
            .getRawOne();

        return res.json({
            balanceTotal: parseFloat(result.balance) || 0
        
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al calcular el resumen financiero" });
    }
}



