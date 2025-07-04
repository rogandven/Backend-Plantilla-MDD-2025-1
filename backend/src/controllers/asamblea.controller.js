import { AppDataSource } from "../config/configDb.js";
import Asamblea from "../entity/asamblea.entity.js";
import { createValidation, updateValidation } from "../validations/asamblea.validation.js"
import { getUserId, getToken } from "../middleware/authentication.middleware.js";

export async function getAsambleas(req, res) {
    try {
        const asambleaRepository = AppDataSource.getRepository(Asamblea);
        const asambleas = await asambleaRepository.find();

        res.status(200).json({ message: "Asambleas encontradas", data: asambleas });
    } catch (error) {
        console.error("Error al obtener las asambleas", error);
        res.status(500).json({ message: "Error al obtener las asambleas" });
    }
}

export async function createAsamblea(req, res) {
    try {
        const asambleaRepository = AppDataSource.getRepository(Asamblea);
        const { description, date } = req.body;

        const creatorId = getUserId(getToken(req))
        console.log(req.body.creatorId)
        if (creatorId == null || creatorId == undefined) {
            return res.status(401).json({
                message: "No es un usuario válido"
            })
        }
        
        req.body.creatorId = creatorId;
        const { error } = createValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const newAsamblea = asambleaRepository.create({
            creatorId,
            description,
            date,
        });
        const savedAsamblea = await asambleaRepository.save(newAsamblea);

        res
            .status(201)
            .json({ message: "Asamblea creada correctamente", data: savedAsamblea });
    } catch (error) {
        console.error("Error al crear asamblea", error);
        res.status(500).json({ message: "Error al crear asamblea." });
    }
}

export async function getAsambleaById(req, res) {
    try {
        const asambleaRepository = AppDataSource.getRepository(Asamblea);
        const { id } = req.params;
        const asamblea = await asambleaRepository.findOne({ where: { id } });
        if (!asamblea) return res.status(404).json({ message: "Asamblea no encontrada." });

        res.status(200).json({ message: "Asamblea encontrada: ", data: asamblea });
    } catch (error) {
        console.error("Error al encontrar asamblea", error);
        res.status(500).json({ message: "Error al encontrar asamblea." });
    }
}

export async function updateAsamblea(req, res) {
    try {
        const asambleaRepository = AppDataSource.getRepository(Asamblea);
        const { description, date, creatorId } = req.body;
        const { id } = req.params;

        const { error } = updateValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const asamblea = await asambleaRepository.findOne({ where: { id } });
        if (!asamblea) return res.status(404).json({ message: "Asamblea no encontrada." });

        asamblea.description = description || asamblea.description;
        asamblea.date = date || asamblea.date;
        asamblea.creatorId = creatorId || asamblea.creatorId;

        await asambleaRepository.save(asamblea);

        res
            .status(200)
            .json({ message: "Asamblea actualizada correctamente", data: asamblea });
    } catch (error) {
        console.error("Error al acutalizar asamblea", error);
        res.status(500).json({ message: "Error al actualizar asamblea." });
    }
}

export async function deleteAsamblea(req, res) {
    try {
        const asambleaRepository = AppDataSource.getRepository(Asamblea);
        const { id } = req.params;

        const asamblea = await asambleaRepository.findOne({ where: { id } });
        if (!asamblea) return res.status(404).json({ message: "Asamblea no encontrada." });

        await asambleaRepository.remove(asamblea);

        res.status(200).json({ message: "Asamblea eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar asamblea", error);
        res.status(500).json({ message: "Error al eliminar asamblea." });
    }
}