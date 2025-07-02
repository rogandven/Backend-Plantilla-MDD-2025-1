import Joi from "joi";

export const validateDate = (date, helper) => {
    const now = new Date(Date.now()).toISOString();

    console.log("NOW:" + now)
    console.log("DATE:" + date)

    if (now.localeCompare(date) <= 0) {
        return true;
    }
    return helper.message("No se puede agendar una asamblea para una fecha que ya pasó")
}

export const createValidation = Joi.object({
    creatorId: Joi.number().integer().min(1).required().messages({
        "number.min": "ID negativo o cero",
        "number.integer": "El ID debe ser un entero",
        "number.base": "El ID debe ser un número",
        "number.infinity": "El ID no puede ser infinito",
        "number.required": "El ID es obligatorio"
    }),
    description: Joi.string().min(1).max(50).required().messages({
        "string.max": "La descripción no puede tener más de 50 caracteres",
        "string.min": "La descripción no puede ser vacía",
        "string.empty": "La descripción no puede ser vacía",
        "string.required": "La descripción es obligatoria"
    }),
    date: Joi.string().isoDate().custom(validateDate).required().messages({
        "date.min": "No se puede agendar una asamblea para una fecha que ya pasó",
        "date.required": "La fecha es obligatoria",
        "date.base": "La fecha no está en el formato correcto",
        "date.timestamp": "La fecha tiene que estar en formato timestamp"
    })
}).unknown(false).messages({
    "object.unknown": "No se permiten campos adicionales",
});

export const updateValidation = Joi.object({
    creatorId: Joi.number().integer().min(1).messages({
            "number.min": "ID negativo o cero",
            "number.integer": "El ID debe ser un entero",
            "number.base": "El ID debe ser un número",
            "number.infinity": "El ID no puede ser infinito",
            "number.required": "El ID es obligatorio"
    }),
    description: Joi.string().min(1).max(50).messages({
        "string.max": "La descripción no puede tener más de 50 caracteres",
        "string.min": "La descripción no puede ser vacía",
        "string.empty": "La descripción no puede ser vacía",
        "string.required": "La descripción es obligatoria"
    }),
    date: Joi.string().isoDate().custom(validateDate).messages({
        "date.min": "No se puede agendar una asamblea para una fecha que ya pasó",
        "date.required": "La fecha es obligatoria",
        "date.base": "La fecha no está en el formato correcto",
        "date.timestamp": "La fecha tiene que estar en formato timestamp",
        "date.greater": "La No se puede agendar una asamblea para una fecha que ya pasó"
    })
}).unknown(false).messages({
    "object.unknown": "No se permiten campos adicionales",
});

export default createValidation;