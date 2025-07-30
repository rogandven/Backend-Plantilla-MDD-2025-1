"use strict";
import Joi from "joi"

export const createValidation = Joi.object({
    nombre_del_profesor: Joi.string()
    .min(3)
    .max(50)
    .required()
    .pattern(/^[a-zA-Z\s:;,.áéíóúàèìòù]+$/)
    .messages({
        "string.pattern.base":"el nombre solo puede contener letras y numeros",
        "string.min": "el nombre debe tener al menos tres caracteres",
        "string.max": "el nombre debe tener menos de cincuenta caracteres",
        "string.empty": "el nombre es obligatorio",
        "any.required": "el nombre es obligatorio",
    }),

    descripcion: Joi.string()
    .min(3)
    .max(500)
    .required()
    .pattern(/^[a-zA-Z\s:;,.áéíóúàèìòù]+$/)
    .messages({
        "string.pattern.base":"La descripción solo puede contener letras y numeros",
        "string.min": "La descripción debe tener al menos tres caracteres",
        "string.max": "La descripción debe tener menos de cincuenta caracteres",
        "string.empty": "La descripción es obligatoria",
        "any.required": "La descripción es obligatoria"
    }),

    ramo: Joi.string()
    .min(3)
    .max(50)
    .required()
    .pattern(/^[a-zA-Z\s:;,.áéíóúàèìòù]+$/)
    .messages({
        "string.pattern.base":"el ramo solo puede contener letras y numeros",
        "string.min": "el ramo debe tener al menos tres caracteres",
        "string.max": "el ramo debe tener menos de cincuenta caracteres",
        "string.empty": "el ramo es obligatorio",
        "any.required": "el ramo es obligatorio",
    }),
})
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten campos adicionales",
    });

export const updateValidation = Joi.object({
    nombre_del_profesor: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s:;,.áéíóúàèìòù]+$/)
    .messages({
        "string.pattern.base":"el nombre solo puede contener letras y numeros",
        "string.min": "el nombre debe tener al menos tres caracteres",
        "string.max": "el nombre debe tener menos de cincuenta caracteres",
        "any.required": "el nombre es obligatorio"
    }),

    descripcion: Joi.string()
    .min(3)
    .max(500)
    .pattern(/^[a-zA-Z\s:;,.áéíóúàèìòù]+$/)
    .messages({
        "string.pattern.base":"La descripción solo puede contener letras y numeros",
        "string.min": "La descripción debe tener al menos tres caracteres",
        "string.max": "La descripción debe tener menos de cincuenta caracteres",
        "any.required": "La descripción es obligatoria"
    }),

    ramo: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s:;,.áéíóúàèìòù]+$/)
    .messages({
        "string.pattern.base":"el ramo solo puede contener letras y numeros",
        "string.min": "el ramo debe tener al menos tres caracteres",
        "string.max": "el ramo debe tener menos de cincuenta caracteres",
        "any.required": "El ramo es obligatorio"
    }),

})
.unknown(false)
.messages({
    "object.unknown": "No se permiten campos adicionales",
});
