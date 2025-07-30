
/*"use strict";
import Joi from "joi";

//Validacion para crear una solicitud
export const crearSolicitudValidation = Joi.object({
  //se establece que Nombre del estudiante debe tener solo letras, tildes y espacios, mínimo 3, máximo 50 caracteres
  nombre_estudiante: Joi.string()
    .trim()
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/)
    .required()
    .messages({
      "string.pattern.base": "El nombre debe tener entre 3 y 50 letras o espacios, sin dejarlo en blanco.",
      "string.empty": "El nombre del estudiante es obligatorio.",
    }),

  //se establece que el correo institucional debe tener dominio @ubiobio.cl
  correo_estudiante: Joi.string()
    .trim()
    .pattern(/^[\w.-]+@ubiobio\.cl$/)
    .required()
    .messages({
      "string.pattern.base": "Debe ingresar un correo institucional válido con dominio @ubiobio.cl.",
      "string.empty": "El correo institucional es obligatorio.",
    }),

  //se establece que carrera solo puede tener letras y espacios, mínimo 3 y maximo 100 caracteres
  carrera: Joi.string()
    .trim()
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/)
    .required()
    .messages({
      "string.pattern.base": "La carrera debe tener entre 3 y 100 letras o espacios.",
      "string.empty": "La carrera es obligatoria.",
    }),

  //se establece que la descripción del caso debe tener minimo 10, maximo 500 caracteres, ademas no puede estar vacia ni solo espacios
  descripcion: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .required()
    .messages({
      "string.min": "La descripción debe tener al menos 10 caracteres.",
      "string.max": "La descripción no puede exceder los 500 caracteres.",
      "string.empty": "La descripción del caso es obligatoria.",
    }),
})
  .unknown(false)//no se permiten campos adicionales
  .messages({
    "object.unknown": "No se permiten campos adicionales.",
  });

//Validacion para actualizar una solicitud (campos opcionales)
//las validaciones son las mismas que para crearSolicitudValidation
export const updateSolicitudValidation = Joi.object({
  //nombre del estudiante (opcional)
  nombre_estudiante: Joi.string()
    .trim()
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/)
    .messages({
      "string.pattern.base": "El nombre debe tener entre 3 y 50 letras o espacios.",
    }),

  //correo institucional (opcional)
  correo_estudiante: Joi.string()
    .trim()
    .pattern(/^[\w.-]+@ubiobio\.cl$/)
    .messages({
      "string.pattern.base": "Debe ingresar un correo institucional válido con dominio @ubiobio.cl.",
    }),

  //carrera (opcional)
  carrera: Joi.string()
    .trim()
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/)
    .messages({
      "string.pattern.base": "La carrera debe tener entre 3 y 100 letras o espacios.",
    }),

  //descripción (opcional)
  descripcion: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .messages({
      "string.min": "La descripción debe tener al menos 10 caracteres.",
      "string.max": "La descripción no puede exceder los 500 caracteres.",
    }),
})
  .unknown(false) //no se permiten campos extra
  .messages({
    "object.unknown": "No se permiten campos adicionales.",
  });

*/

/*
"use strict";
import Joi from "joi";

// Validación para crear una solicitud
export const crearSolicitudValidation = Joi.object({
  nombre_estudiante: Joi.string()
    .trim()
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/)
    .required()
    .messages({
      "string.pattern.base": "El nombre debe tener entre 3 y 50 letras o espacios, sin dejarlo en blanco.",
      "string.empty": "El nombre del estudiante es obligatorio.",
    }),
  correo_estudiante: Joi.string()
  .trim()
  .pattern(/^[\w.-]+@alumnos\.ubiobio\.cl$/)
  .required()
  .messages({
    "string.pattern.base":
      "Debe ingresar un correo institucional válido con dominio @alumnos.ubiobio.cl.",
    "string.empty": "El correo institucional es obligatorio.",
  }),

  carrera: Joi.string()
    .trim()
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/)
    .required()
    .messages({
      "string.pattern.base": "La carrera debe tener entre 3 y 100 letras o espacios.",
      "string.empty": "La carrera es obligatoria.",
    }),
  descripcion: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .required()
    .messages({
      "string.min": "La descripción debe tener al menos 10 caracteres.",
      "string.max": "La descripción no puede exceder los 500 caracteres.",
      "string.empty": "La descripción del caso es obligatoria.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales.",
  });

// Validación para actualizar una solicitud (todos los campos son opcionales)
export const updateSolicitudValidation = Joi.object({
  nombre_estudiante: Joi.string()
    .trim()
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/)
    .messages({
      "string.pattern.base": "El nombre debe tener entre 3 y 50 letras o espacios.",
    }),
  correo_estudiante: Joi.string()
    .trim()
    .pattern(/^[\w.-]+@alumnos\.ubiobio\.cl$/)//
    .messages({
      "string.pattern.base": "Debe ingresar un correo institucional válido con dominio @ubiobio.cl.",
    }),
  carrera: Joi.string()
    .trim()
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/)
    .messages({
      "string.pattern.base": "La carrera debe tener entre 3 y 100 letras o espacios.",
    }),
  descripcion: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .messages({
      "string.min": "La descripción debe tener al menos 10 caracteres.",
      "string.max": "La descripción no puede exceder los 500 caracteres.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales.",
  });

*/

"use strict"; 

//se importa la librería Joi para realizar validaciones de datos
import Joi from "joi";

//Validación para crear una solicitud (todos los campos son requeridos)
export const crearSolicitudValidation = Joi.object({
  // se valida el nombre del estudiante
  nombre_estudiante: Joi.string()
    .trim() // elimina espacios al inicio y final
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/) // solo letras y espacios, entre 3 y 50 caracteres
    .required() // el campo es obligatorio
    .messages({
      "string.pattern.base": "El nombre debe tener entre 3 y 50 letras o espacios, sin dejarlo en blanco.",
      "string.empty": "El nombre del estudiante es obligatorio.",
    }),
  //se valida el correo institucional del estudiante
  correo_estudiante: Joi.string()
    .trim() // elimina espacios al inicio y final
    .pattern(/^[a-zA-Z0-9._%+-]+@(alumnos\.ubiobio\.cl|ubiobio\.cl)$/) // solo se permiten correos que terminen en @alumnos.ubiobio.cl
    .required() // el campo es obligatorio
    .messages({
      "string.pattern.base": "Debe ingresar un correo institucional válido con dominio @alumnos.ubiobio.cl.",
      "string.empty": "El correo institucional es obligatorio.",
    }),

  //se valida la carrera del estudiante
  carrera: Joi.string()
    .trim() // elimina espacios innecesarios
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/) // solo letras y espacios, entre 3 y 100 caracteres
    .required() // el campo es obligatorio
    .messages({
      "string.pattern.base": "La carrera debe tener entre 3 y 100 letras o espacios.",
      "string.empty": "La carrera es obligatoria.",
    }),

  //se valida la descripción de la solicitud
  descripcion: Joi.string()
    .trim() // elimina espacios innecesarios
    .min(10) // mínimo 10 caracteres
    .max(500) // máximo 500 caracteres
    .required() // el campo es obligatorio
    .messages({
      "string.min": "La descripción debe tener al menos 10 caracteres.",
      "string.max": "La descripción no puede exceder los 500 caracteres.",
      "string.empty": "La descripción del caso es obligatoria.",
    }),
})
  .unknown(false) // no se permiten campos que no estén definidos en el esquema
  .messages({
    "object.unknown": "No se permiten campos adicionales.",
  });

//Validación para actualizar una solicitud (todos los campos son opcionales)
export const updateSolicitudValidation = Joi.object({
  // el nombre del estudiante puede ser modificado si cumple con el patrón
  nombre_estudiante: Joi.string()
    .trim()
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/)
    .messages({
      "string.pattern.base": "El nombre debe tener entre 3 y 50 letras o espacios.",
    }),

  //el correo institucional puede modificarse si mantiene el formato correcto
  correo_estudiante: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9._%+-]+@(alumnos\.ubiobio\.cl|ubiobio\.cl)$/) // debe ser correo institucional
    .messages({
      "string.pattern.base": "Debe ingresar un correo institucional válido con dominio @ubiobio.cl.",
    }),

  //la carrera también puede modificarse si cumple con el formato
  carrera: Joi.string()
    .trim()
    .pattern(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/)
    .messages({
      "string.pattern.base": "La carrera debe tener entre 3 y 100 letras o espacios.",
    }),

  //la descripción puede ser modificada dentro de los límites de longitud
  descripcion: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .messages({
      "string.min": "La descripción debe tener al menos 10 caracteres.",
      "string.max": "La descripción no puede exceder los 500 caracteres.",
    }),
})
  .unknown(false) // no se permite enviar campos que no estén definidos
  .messages({
    "object.unknown": "No se permiten campos adicionales.",
  });
