/*"use strict";
import Joi from "joi";


const domainEmailValidator = (value, helpers) => {
  const allowed = [
    "@alumnos.ubiobio.cl", // estudiantes
    "@gmail.com",          // admin
    "@cee.ubiobio.cl"      // integrantes CEE
  ];
  if (!allowed.some(d => value.endsWith(d)))
    return helpers.message(
      "El correo debe terminar en @alumnos.ubiobio.cl, @cee.ubiobio.cl o @gmail.com."
    );
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

  //validar cee
  // Validación específica para crear integrantes del CEE (solo admin)
export const registerCeeValidation = Joi.object({
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
    .pattern(/^[\w.-]+@cee\.ubiobio\.cl$/)
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.empty": "El correo electrónico es obligatorio.",
      "string.pattern.base": "El correo debe terminar en @cee.ubiobio.cl",
    }),
  password: Joi.string()
    .min(8)
    .max(26)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatoria.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });
*/

"use strict"; //se activa el modo estricto para evitar errores silenciosos y mejorar el código

//se importa la librería Joi para realizar validaciones de datos
import Joi from "joi";

/*
  Función personalizada: domainEmailValidator
  Se encarga de validar que el correo termine en alguno de los dominios permitidos
  - @alumnos.ubiobio.cl → estudiantes
  - @cee.ubiobio.cl     → integrantes CEE
  - @gmail.com          → administrador
*/
const domainEmailValidator = (value, helpers) => {
  const allowed = [
    "@alumnos.ubiobio.cl", // estudiantes
    "@gmail.com",          // administrador
    "@cee.ubiobio.cl"      // integrantes del CEE
  ];
  //se revisa si el correo termina en alguno de los dominios permitidos
  if (!allowed.some(d => value.endsWith(d)))
    return helpers.message(
      "El correo debe terminar en @alumnos.ubiobio.cl, @cee.ubiobio.cl o @gmail.com."
    );
  //si es válido, se retorna el mismo valor sin errores
  return value;
};

/*
  Esquema de validación: registerValidation
  Se usa para validar los datos al registrar un nuevo usuario común
  Aplica validación de campos como: username, rut, email y password
*/
export const registerValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
      "string.pattern.base": "El nombre de usuario solo puede contener letras, números y guiones bajos.",
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
      "any.required": "La contraseña es obligatoria.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
    }),
})
  .unknown(false) //no se permiten campos adicionales no definidos
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });

/*
  Esquema de validación: loginValidation
  Se usa para validar los datos al momento de iniciar sesión
  Solo se requieren dos campos: email y password
*/
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
  password: Joi.string()
    .min(8)
    .max(26)
    .required()
    .messages({
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

/*
  Esquema de validación: registerCeeValidation
  Se usa para validar los datos al registrar un integrante del CEE
  Solo el administrador puede usar este formulario
  Se valida que el correo termine en @cee.ubiobio.cl
*/
export const registerCeeValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
      "string.pattern.base": "El nombre de usuario solo puede contener letras, números y guiones bajos.",
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
    .pattern(/^[\w.-]+@cee\.ubiobio\.cl$/)
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.empty": "El correo electrónico es obligatorio.",
      "string.pattern.base": "El correo debe terminar en @cee.ubiobio.cl",
    }),
  password: Joi.string()
    .min(8)
    .max(26)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatoria.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });
