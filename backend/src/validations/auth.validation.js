"use strict";
import Joi from "joi";

// Función para validar que el correo electrónico termine en @gmail.com o @gmail.cl
const domainEmailValidator = (value, helpers) => {
  if (!value.endsWith("alumnos.ubiobio.cl") && !value.endsWith("ubiobio.cl")) {
    return helpers.message(
      "Debe entrar con el correo institucional"
    );
  }
  return value;
};

// Esquema de validación para el registro de usuarios
export const registerValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
      "string.pattern.base":
        "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
      "string.max": "El nombre de usuario no puede exceder los 30 caracteres.",
      "string.empty": "El nombre de usuario es obligatorio.",
    }),
  rut: Joi.string()
    .required()
    .pattern(/^\d{2}\.\d{3}\.\d{3}-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.pattern.base": "Formato rut inválido. Debe ser xx.xxx.xxx-x.",
    }),
  email: Joi.string()
    .email()
    .required()
    .min(15)
    .max(50)
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.min": "El correo electrónico debe tener al menos 15 caracteres.",
      "string.max": "El correo electrónico no puede exceder los 50 caracteres.",
      "string.empty": "El correo electrónico es obligatorio.",
    })
    .custom(
      domainEmailValidator,
      "Validación de dominio de correo electrónico"
    ),
  password: Joi.string()
    .min(8)
    .max(26)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatorio.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });

const roleValidator = (value, helpers) => {
  value = value.toLowerCase();
  switch(value) {
    case "administrador":
    case "usuario":
      return value;
    default:
      return helpers.message(
        "Rol no válido"
      );
  }
};

export const updateValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
      "string.pattern.base":
        "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
      "string.max": "El nombre de usuario no puede exceder los 30 caracteres.",
      "string.empty": "El nombre de usuario es obligatorio.",
    }),
  rut: Joi.string()
    .pattern(/^\d{2}\.\d{3}\.\d{3}-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.pattern.base": "Formato rut inválido. Debe ser xx.xxx.xxx-x.",
    }),
  email: Joi.string()
    .email()
    .min(15)
    .max(50)
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.min": "El correo electrónico debe tener al menos 15 caracteres.",
      "string.max": "El correo electrónico no puede exceder los 50 caracteres.",
      "string.empty": "El correo electrónico es obligatorio.",
    })
    .custom(
      domainEmailValidator,
      "Validación de dominio de correo electrónico"
    ),
  password: Joi.string()
    .min(8)
    .max(26)
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatoria.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
    }),
    role: Joi.string().min(1).custom(roleValidator).messages({
      "string.empty": "El rol no puede ser vacío",
      "any.required": "El rol es obligatorio.",
      "string.min": "El rol no puede ser vacío",
      "string.base": "El rol debe ser una cadena de texto",
    })
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });


// Esquema de validación para el inicio de sesión
export const loginValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.empty": "El correo electrónico es obligatorio.",
    })
    .custom(
      domainEmailValidator,
      "Validación de dominio de correo electrónico"
    ),
  password: Joi.string().min(8).max(26).required().messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
    "string.min": "La contraseña debe tener al menos 8 caracteres.",
    "string.max": "La contraseña debe tener como máximo 26 caracteres.",
  }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });

export default null;