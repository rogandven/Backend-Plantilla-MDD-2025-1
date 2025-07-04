import Joi from "joi";

export const createValidation = Joi.object({
    // id: { type: Number, primary: true, generated: true },
    // name: { type: String, nullable: false },
    // address: { type: String, nullable: false },
    name: Joi.string().min(1).max(20).required().messages({
        "string.base": "El título debe ser una cadena",
        "string.min": "El título no puede ser vacío",
        "string.max": "El título no puede tener más de 20 caracteres",
        "string.reuired": "El título es obligatorio"
    }),
    address: Joi.string().min(1).max(50).required().messages({
        "string.base": "La dirección debe ser una cadena",
        "string.min": "La dirección no puede ser vacío",
        "string.max": "La dirección no puede tener más de 20 caracteres",
        "string.required": "La dirección es obligatorio"
    }),
})
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten campos adicionales",
    });

export const updateValidation = Joi.object({
    name: Joi.string().min(1).max(20).messages({
        "string.base": "El título debe ser una cadena",
        "string.min": "El título no puede ser vacío",
        "string.max": "El título no puede tener más de 20 caracteres",
        "string.required": "El título es obligatorio"
    }),
    address: Joi.string().min(1).max(50).messages({
        "string.base": "La dirección debe ser una cadena",
        "string.min": "La dirección no puede ser vacío",
        "string.max": "La dirección no puede tener más de 20 caracteres",
        "string.required": "La dirección es obligatoria"
    }),
})
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten campos adicionales",
    });