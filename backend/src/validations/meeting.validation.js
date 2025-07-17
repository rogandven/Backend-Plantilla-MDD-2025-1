"use strict";
import { body } from "express-validator";

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
        .optional()
        .isString()
        .withMessage("La descripción debe ser texto")
        .isLength({ max: 500 })
        .withMessage("La descripción no puede exceder los 500 caracteres")
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
        .withMessage("La descripción no puede exceder los 500 caracteres")
];
