import { AppDataSource } from "../config/configDb.js";
import Place from "../entity/place.entity.js";
import { createValidation, updateValidation } from "../validations/place.validation.js"

export async function getPlaces(req, res) {
    try {
        const placeRepository = AppDataSource.getRepository(Place);
        const places = await placeRepository.find();

        res.status(200).json({ message: "Lugares encontrados", data: places });
    } catch (error) {
        console.error("Error al obtener los lugares", error);
        res.status(500).json({ message: "Error al obtener los lugares." });
    }
}

export async function createPlace(req, res) {
    try {
        const placeRepository = AppDataSource.getRepository(Place);
        const { name, address } = req.body;
        const { error } = createValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const newPlace = placeRepository.create({
            name,
            address,
        });
        const savedPlace = await placeRepository.save(newPlace);

        res
            .status(201)
            .json({ message: "Lugar creado correctamente", data: savedPlace });
    } catch (error) {
        console.error("Error al crear lugar", error);
        res.status(500).json({ message: "Error al crear lugar." });
    }
}

export async function deletePlace(req, res) {
    try {
        const placeRepository = AppDataSource.getRepository(Place);
        const { id } = req.params;

        const place = await placeRepository.findOne({ where: { id } });
        if (!place) return res.status(404).json({ message: "Lugar no encontrado." });

        await placeRepository.remove(place);

        res.status(200).json({ message: "Lugar eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar lugar", error);
        res.status(500).json({ message: "Error al eliminar lugar." });
    }
}

// getPlaces,
// getPlaceById,
// createPlace,
// updatePlace,
// deletePlace

export async function updatePlace(req, res) {
    try {
        const placeRepository = AppDataSource.getRepository(Place);
        const { name, address } = req.body;
        const { id } = req.params;

        const { error } = updateValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const place = await placeRepository.findOne({ where: { id } });
        if (!place) return res.status(404).json({ message: "Lugar no encontrado." });

        place.name = name || place.name;
        place.address = address || place.address;

        await placeRepository.save(place);

        res
            .status(200)
            .json({ message: "Lugar actualizado correctamente", data: place });
    } catch (error) {
        console.error("Error al acutalizar lugar", error);
        res.status(500).json({ message: "Error al actualizar lugar." });
    }
}

export async function getPlaceById(req, res) {
    try {
        const placeRepository = AppDataSource.getRepository(Place);
        const { id } = req.params;
        const place = await placeRepository.findOne({ where: { id } });
        if (!place) return res.status(404).json({ message: "Lugar no encontrado." });

        res.status(200).json({ message: "Lugar encontrado: ", data: place });
    } catch (error) {
        console.error("Error al encontrar lugar", error);
        res.status(500).json({ message: "Error al encontrar lugar." });
    }
}