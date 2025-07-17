"use strict";
import Joi from "joi";


export const OperacionesBodyValidation = Joi.object({
    nombre_actividad: Joi.string()
        .min(3)
        .messages({
            'string.empty': "El nombre no puede estar vacío.",
            'string.base': "El nombre debe ser de tipo texto.",
        }),
        egreso: Joi.number()
        .min(3)
        
        .messages({
            'number.empty': "El egreso no puede estar vacío.",
            'number.base': "El egreso debe ser de tipo numero.",
        }),
        ingreso: Joi.number()
        .min(3)
        .messages({
            'number.empty': "El ingreso no puede estar vacío.",
            'number.base': "El ingreso debe ser de tipo numero.",
        }),
}).unknown(false).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});
