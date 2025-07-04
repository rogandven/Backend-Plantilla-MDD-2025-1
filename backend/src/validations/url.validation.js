import Joi from "joi";

export const createValidation = Joi.object({
    link: Joi.string().min(1).max(100).required().messages({
        "string.base": "El link debe ser una cadena",
        "string.min": "El link no puede ser vacío",
        "string.max": "El link no puede tener más de 20 caracteres",
        "string.required": "El link es obligatorio"
    }),
})
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten campos adicionales",
});

export const updateValidation = Joi.object({
    link: Joi.string().min(1).max(100).messages({
        "string.base": "El link debe ser una cadena",
        "string.min": "El link no puede ser vacío",
        "string.max": "El link no puede tener más de 20 caracteres",
        "string.required": "El link es obligatorio"
    }),
})
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten campos adicionales",
});