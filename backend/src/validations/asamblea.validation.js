import Joi from "joi";

const placeValidator = (value, helpers) => {
    if (value == null) {
        return value;
    }
    if (typeof(value) !== "string") {
        return helpers.message("El lugar debe ser una cadena de caracteres");
    }
    return value;
};

const urlValidator = (value, helpers) => {
    if (value == null) {
        return value;
    }
    if (typeof(value) !== "string") {
        return helpers.message("El link debe ser una cadena de caracteres");
    }
    if (value.match(URL_REGEXP) == null) {
        return helpers.message("Link inválido");
    }    
    return value;
};


export const URL_REGEXP = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;
export const NULL_INDICATOR = -1;

export const validateDate = (date, helper) => {
    const now = new Date(Date.now()).toISOString();

    // console.log("NOW:" + now)
    // console.log("DATE:" + date)

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
        "any.required": "El ID es obligatorio"
    }),
    description: Joi.string().min(1).max(50).required().messages({
        "string.max": "La descripción no puede tener más de 50 caracteres",
        "string.min": "La descripción no puede ser vacía",
        "string.empty": "La descripción no puede ser vacía",
        "any.required": "La descripción es obligatoria",
        "string.base": "La descripción debe ser una cadena"
    }),
    date: Joi.string().required().isoDate().custom(validateDate).messages({
        "any.required": "La fecha es obligatoria",
        "string.base": "La fecha no está en el formato correcto",
        "string.isoDate": "La fecha tiene que estar en formato timestamp",
        "date.required": "La fecha es obligatoria",
        "date.base": "La fecha no está en el formato correcto",
        "date.isoDate": "La fecha tiene que estar en formato timestamp"
    }),
    url: Joi.string().min(1).pattern(URL_REGEXP).messages({
            "string.max": "El link no puede tener más de 50 caracteres",
            "string.min": "El link no puede ser vacío",
            "string.pattern": "El link debe ser un URL válido",            
            "string.empty": "El link no puede ser vacío",
            "any.required": "El link es obligatorio",
    }),
    place: Joi.string().min(1).max(50).messages({
        "string.max": "El lugar no puede tener más de 50 caracteres",
        "string.min": "El lugar no puede ser vacío",
        "string.empty": "El lugar no puede ser vacío",
        "any.required": "El lugar es obligatorio",
        "string.base": "El lugar debe ser una cadena"
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
        "any.required": "La descripción es obligatoria",
        "string.base": "La descripción debe ser una cadena"
    }),
    date: Joi.string().isoDate().custom(validateDate).messages({
        "any.required": "La fecha es obligatoria",
        "string.base": "La fecha no está en el formato correcto",
        "string.isoDate": "La fecha tiene que estar en formato timestamp",
        "date.required": "La fecha es obligatoria",
        "date.base": "La fecha no está en el formato correcto",
        "date.isoDate": "La fecha tiene que estar en formato timestamp"
    }),
    url: Joi.custom(urlValidator).messages({
        "string.max": "El link no puede tener más de 50 caracteres",
        "any.required": "El link es obligatorio"
    }),
    place: Joi.custom(placeValidator).messages({
        "string.max": "El lugar no puede tener más de 50 caracteres",
        "string.min": "El lugar no puede ser vacío",
        "string.empty": "El lugar no puede ser vacío",
        "any.required": "El lugar es obligatorio",
        "string.base": "El lugar debe ser una cadena"
    })
}).unknown(false).messages({
    "object.unknown": "No se permiten campos adicionales",
});

export default createValidation;