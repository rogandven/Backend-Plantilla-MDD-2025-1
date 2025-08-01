"use strict";
import { body } from "express-validator";
// const Joi = require('joi').extend(require('@joi/date'));
import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const validateDate = (date, helper) => {
    const now = new Date(Date.now()).toISOString().split("T")[0];

    // console.log("NOW:" + now)
    // console.log("DATE:" + date)

    if (now.localeCompare(String(date)) <= 0) {
        return true;
    }
    return helper.message("No se puede agendar una reunión para una fecha que ya pasó")
}

export const createValidation = Joi.object({
    date: Joi.date("YYYY-MM-DD").required().messages({
        "any.required": "La fecha es obligatoria",
        "date.base": "La fecha debe ser en formato fecha"
    }),
    time: Joi.string().required().pattern(/^([0-9]{2})\:([0-9]{2})$/).messages({
        "string.base": "La hora debe estar adentro de una cadena de caracteres",
        "any.required": "La hora es obligatoria",
        "string.pattern": "El formato de la hora es incorrecto" 
    }),
    description: Joi.string().required().min(10).max(500).messages({
        "any.required": "La descripción es obligatoria",
        "string.base": "La descripción debe ser una cadena de caracteres",
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción no puede tener más de 500 caracteres"
    })
    /*
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
    */
}).unknown(false).messages({
    "object.unknown": "No se permiten campos adicionales",
});

export const updateValidation = Joi.object({
    date: Joi.date("YYYY-MM-DD").custom(validateDate).messages({
        "any.required": "La fecha es obligatoria",
        "date.base": "La fecha debe ser en formato fecha"
    }),
    time: Joi.string().pattern(/^([0-9]{2})\:([0-9]{2})$/).messages({
        "string.base": "La hora debe estar adentro de una cadena de caracteres",
        "any.required": "La hora es obligatoria",
        "string.pattern": "El formato de la hora es incorrecto" 
    }),
    description: Joi.string().min(10).max(500).messages({
        "any.required": "La descripción e mobile es obligatoria",
        "string.base": "La descripción debe ser una cadena de caracteres",
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción no puede tener más de 500 caracteres"
    })
}).unknown(false).messages({
    "object.unknown": "No se permiten campos adicionales",
});

export default createValidation;

/*
export const createMeetingValidation = [
    body("date")
        .notEmpty()
        .withMessage("La fecha es requerida")
        .isISO8601()
        .withMessage("La fecha debe estar en formato válido")
        .custom((value) => {
            const date = new Date(value);
            const now = new Date();
            if (date < now) {
                throw new Error("No se pueden agendar reuniones con fecha anterior a la actual");
            }
            return true;
        }),
    body("description")
        .notEmpty()
        .withMessage("La descripción es requerida")
        .isString()
        .withMessage("La descripción debe ser texto")
        .isLength({ max: 500 })
        .withMessage("La descripción no puede exceder los 500 caracteres"),
    body("time")
        .notEmpty()
        .withMessage("La hora es requerida")
        .isISO8601()
        .withMessage("La hora debe estar en formato válido")
];

export const updateMeetingValidation = [
    body("date")
        .optional()
        .isISO8601()
        .withMessage("La fecha debe estar en formato válido")
        .custom((value) => {
            const date = new Date(value);
            const now = new Date();
            if (date < now) {
                throw new Error("No se pueden agendar reuniones con fecha anterior a la actual");
            }
            return true;
        }),
    body("description")
        .optional()
        .isString()
        .withMessage("La descripción debe ser texto")
        .isLength({ max: 500 })
        .withMessage("La descripción no puede exceder los 500 caracteres"),
    body("time")
        .optional()
        .isISO8601()
        .withMessage("La hora debe estar en formato válido")
    /*
    body("date")
        .optional()
        .isISO8601()
        .withMessage("La fecha debe estar en formato válido")
        .custom((value) => {
            const date = new Date(value);
            const now = new Date();
            if (date < now) {
                throw new Error("No se pueden agendar reuniones con fecha anterior a la actual");
            }
            return true;
        }),
    body("description")
        .optional()
        .isString()
        .withMessage("La descripción debe ser texto")
        .isLength({ max: 500 })
        .withMessage("La descripción no puede exceder los 500 caracteres")
        */
// ];
// */