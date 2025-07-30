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

"use strict"; 
//se importa la librería Joi para validar datos de manera declarativa
import Joi from "joi";
//se define la función domainEmailValidator para verificar dominios válidos de correo
const domainEmailValidator = (value, helpers) => {
  //se especifican los dominios permitidos
  const allowed = [
    "@alumnos.ubiobio.cl", // estudiantes
    "@gmail.com",          // administrador
    "@cee.ubiobio.cl"      // integrantes CEE
  ];
  //se comprueba si el correo termina con alguno de los dominios permitidos
  if (!allowed.some(d => value.endsWith(d)))
    //se retorna mensaje de error si el dominio no es válido
    return helpers.message(
      "El correo debe terminar en @alumnos.ubiobio.cl, @cee.ubiobio.cl o @gmail.com."
    );
  //si el dominio es válido se retorna el valor sin modificaciones
  return value;
};
//se define el esquema registerValidation para validar el registro de un usuario
export const registerValidation = Joi.object({
  //se valida el campo username con longitud entre 3 y 30 y caracteres alfanuméricos o guion bajo
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
  //se valida el rut con el formato xx.xxx.xxx-x
  rut: Joi.string()
    .required()
    .pattern(/^\d{2}\.\d{3}\.\d{3}-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.pattern.base": "Formato rut inválido. Debe ser xx.xxx.xxx-x.",
    }),
  //se valida el correo con longitud mínima 15 y máxima 50 y dominio permitido
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
    .custom(domainEmailValidator, "Validación de dominio de correo electrónico"),
  //se valida la contraseña con longitud entre 8 y 26 caracteres
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
  //se prohíben campos adicionales no especificados
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });

//se define el esquema loginValidation para validar el inicio de sesión
export const loginValidation = Joi.object({
  //se valida el correo con dominio permitido
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.empty": "El correo electrónico es obligatorio.",
    })
    .custom(domainEmailValidator, "Validación de dominio de correo electrónico"),
  //se valida la contraseña con longitud entre 8 y 26 caracteres
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

//se define el esquema registerCeeValidation para registrar integrantes CEE (solo admin)
export const registerCeeValidation = Joi.object({
  //se valida el username con las mismas restricciones de longitud y patrón
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
  //se valida el rut con el formato indicado
  rut: Joi.string()
    .required()
    .pattern(/^\d{2}\.\d{3}\.\d{3}-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.pattern.base": "Formato rut inválido. Debe ser xx.xxx.xxx-x.",
    }),
  //se valida el correo para que termine exactamente en @cee.ubiobio.cl
  email: Joi.string()
    .email()
    .required()
    .pattern(/^[\w.-]+@cee\.ubiobio\.cl$/)
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.empty": "El correo electrónico es obligatorio.",
      "string.pattern.base": "El correo debe terminar en @cee.ubiobio.cl",
    }),
  //se valida la contraseña con longitud entre 8 y 26 caracteres
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
