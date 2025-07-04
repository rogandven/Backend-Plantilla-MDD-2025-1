import { AppDataSource } from "../config/configDb.js";
import Url from "../entity/url.entity.js";
import { createValidation, updateValidation } from "../validations/url.validation.js"

export async function getUrls(req, res) {
    try {
        const urlRepository = AppDataSource.getRepository(Url);
        const urls = await urlRepository.find();

        res.status(200).json({ message: "Links encontrados", data: urls });
    } catch (error) {
        console.error("Error al obtener los links", error);
        res.status(500).json({ message: "Error al obtener los links." });
    }
}

export async function createUrl(req, res) {
    try {
        const urlRepository = AppDataSource.getRepository(Url);
        const { link } = req.body;
        const { error } = createValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const newUrl = urlRepository.create({
            link,
        });
        const savedUrl = await urlRepository.save(newUrl);

        res
            .status(201)
            .json({ message: "Link creado correctamente", data: savedUrl });
    } catch (error) {
        console.error("Error al crear link", error);
        res.status(500).json({ message: "Error al crear link." });
    }
}

export async function deleteUrl(req, res) {
    try {
        const urlRepository = AppDataSource.getRepository(Url);
        const { id } = req.params;

        const url = await urlRepository.findOne({ where: { id } });
        if (!url) return res.status(404).json({ message: "Link no encontrado." });

        await urlRepository.remove(url);

        res.status(200).json({ message: "Link eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar link", error);
        res.status(500).json({ message: "Error al eliminar link." });
    }
}

// getUrls,
// getUrlById,
// createUrl,
// updateUrl,
// deleteUrl

export async function updateUrl(req, res) {
    try {
        const urlRepository = AppDataSource.getRepository(Url);
        const { link } = req.body;
        const { id } = req.params;

        const { error } = updateValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const url = await urlRepository.findOne({ where: { id } });
        if (!url) return res.status(404).json({ message: "Link no encontrado." });

        url.link = link || url.link;

        await urlRepository.save(url);

        res
            .status(200)
            .json({ message: "Link actualizado correctamente", data: url });
    } catch (error) {
        console.error("Error al acutalizar link", error);
        res.status(500).json({ message: "Error al actualizar link." });
    }
}

export async function getUrlById(req, res) {
    try {
        const urlRepository = AppDataSource.getRepository(Url);
        const { id } = req.params;
        const url = await urlRepository.findOne({ where: { id } });
        if (!url) return res.status(404).json({ message: "Link no encontrado." });

        res.status(200).json({ message: "Link encontrado: ", data: url });
    } catch (error) {
        console.error("Error al encontrar link", error);
        res.status(500).json({ message: "Error al encontrar link." });
    }
}