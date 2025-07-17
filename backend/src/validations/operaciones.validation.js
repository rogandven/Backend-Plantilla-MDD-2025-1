"use strict";
import Joi from "joi";

export const OperacionesQueryValidation = Joi.object({
    id: Joi.number()
        .required()
        .messages({
            "number.base": "El id debe ser un numero",
            "any.required": "Debe proporcionar el id de la actividad a eliminar",
        }),
})
    .or("id")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar el parámetro: id.",
    });
export const OperacionesBodyValidation = Joi.object({
    nombre_actividad: Joi.string()
        .min(3)
        .messages({
            'string.empty': "El nombre no puede estar vacío.",
            'string.base': "El nombre debe ser de tipo texto.",
        }),
        egreso: Joi.number()
        .min(1)
        .messages({
            'number.min':"el egreso debe ser por lo menos de 1 caracter",
            'number.empty': "El egreso no puede estar vacío.",
            'number.base': "El egreso debe ser de tipo numero.",
        }),
        ingreso: Joi.number()
        .min(1)
        .messages({
             'number.min':"el egreso debe ser por lo menos de 1 caracter",
            'number.empty': "El ingreso no puede estar vacío.",
            'number.base': "El ingreso debe ser de tipo numero.",
        }),
}).unknown(false).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});
