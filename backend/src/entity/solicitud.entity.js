/*
"use strict";

//se importa la clase EntitySchema desde TypeORM
//esta clase permite definir entidades mediante objetos 
import { EntitySchema } from "typeorm";

//se exporta la constante SolicitudEntity que define la entidad Solicitud
//esto permite usar esta entidad en otros archivos del proyecto
export const SolicitudEntity = new EntitySchema({
  //se define la entidad Solicitud
  name: "Solicitud",
  //se define el nombre real de la tabla que se creará en la BD
  tableName: "solicitudes",

  //se definen las columnas de la tabla, cada clave es una columna distinta 
  columns: {
    //columna id con tipo Integer, clave primaria y auto-incremental
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    //columna para el nombre del estudiante, tipo VARCHAR y obligatorio
    nombre_estudiante: {
      type: String,
      nullable: false,
    },
    //columna para el correo del estudiante, tipo VARCHAR y obligatorio
    correo_estudiante: {
      type: String,
      nullable: false,
    },
    //columna para la carrera del estudiante, tipo VARCHAR y obligatorio
    carrera: {
      type: String,
      nullable: false,
    },
    //columna para la descripción del caso, tipo VARCHAR y obligatorio
    descripcion: {
      type: String,
      nullable: false,
    },
    //columna para guardar la fecha de creación de la solicitud
    //se asigna automáticamente al momento de crear el registro
    fecha_creacion: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    //columna para guardar la fecha de actualización
    //se actualiza automáticamente cada vez que se modifica el registro
    fecha_actualizacion: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: () => "CURRENT_TIMESTAMP",
    },
  },

  //se definen las relaciones con otras entidades
  relations: {
    //se define la realcion creador 
    creador: {
      //su cardinalidad es de N a 1
      type: "many-to-one",
      //se define que la entidad con la que se realciona es es User
      target: "User",
      //JoinColumna permite la creacion de la columna de la union en la BD
      joinColumn: true,
      //nullable indica que el campo es obligatorio 
      nullable: false,
      //eager carga automaticamente la realacion al realizar la consulta
      eager: true,
    },
    //se define la relacion gestor 
    gestor: {
      //su cardinalidad es de N a 1
      type: "many-to-one",
      //target define que la entidad con la que se relaciona es User
      target: "User",
      //joinColumn permite la creacion de la columna de union con el gestor
      joinColumn: true,
      //nullable false indica que este campo es obligatorio por lo tanto es no nulo
      nullable: false,//siguiendo buenas practicas 
      //eager indica que la relacion se carga automaticamente al realizar consulta 
      eager: true,
    },
    //se define la realcion estado 
    estado: {
      //se define la cardinalidad N a 1
      type: "many-to-one",
      //se realaciona con la entidad Estado
      target: "Estado",
      //crea la columna de union con es Estado
      joinColumn: true,
      //se define que toda solicitud debe detener un estado 
      nullable: false,
      //la realcion se carga automaticamente
      eager: true,
    },
  },
});

//se exporta la entidad con valor por defecto 
export default SolicitudEntity;

*/
/*
"use strict";

//se importa la clase EntitySchema desde TypeORM
//esta clase permite definir entidades mediante objetos 
import { EntitySchema } from "typeorm";

//se exporta la constante SolicitudEntity que define la entidad Solicitud
//esto permite usar esta entidad en otros archivos del proyecto
export const SolicitudEntity = new EntitySchema({
  //se define la entidad Solicitud
  name: "Solicitud",
  //se define el nombre real de la tabla que se creará en la BD
  tableName: "solicitudes",

  //se definen las columnas de la tabla, cada clave es una columna distinta 
  columns: {
    //columna id con tipo Integer, clave primaria y auto-incremental
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    //columna para el nombre del estudiante, tipo VARCHAR y obligatorio
    nombre_estudiante: {
      type: String,
      nullable: false,
    },
    //columna para el correo del estudiante, tipo VARCHAR y obligatorio
    correo_estudiante: {
      type: String,
      nullable: false,
    },
    //columna para la carrera del estudiante, tipo VARCHAR y obligatorio
    carrera: {
      type: String,
      nullable: false,
    },
    //columna para la descripción del caso, tipo VARCHAR y obligatorio
    descripcion: {
      type: String,
      nullable: false,
    },
    //columna para almacenar el detalle de la resolución del caso
    //solo se completa cuando la solicitud es resuelta
    detalleResolucion: {
      type: String,
      nullable: false,
      default: "no existe aun",
    },
    //columna para guardar la fecha de creación de la solicitud
    //se asigna automáticamente al momento de crear el registro
    fecha_creacion: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    //columna para guardar la fecha de actualización
    //se actualiza automáticamente cada vez que se modifica el registro
    fecha_actualizacion: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: () => "CURRENT_TIMESTAMP",
    },
  },

  //se definen las relaciones con otras entidades
  relations: {
    //se define la realcion creador 
    creador: {
      //su cardinalidad es de N a 1
      type: "many-to-one",
      //se define que la entidad con la que se realciona es es User
      target: "User",
      //JoinColumna permite la creacion de la columna de la union en la BD
      joinColumn: true,
      //nullable indica que el campo es obligatorio 
      nullable: false,
      //eager carga automaticamente la realacion al realizar la consulta
      eager: true,
    },
    //se define la relacion gestor 
    gestor: {
      //su cardinalidad es de N a 1
      type: "many-to-one",
      //target define que la entidad con la que se relaciona es User
      target: "User",
      //joinColumn permite la creacion de la columna de union con el gestor
      joinColumn: true,
      //nullable false indica que este campo es obligatorio por lo tanto es no nulo
      nullable: false,//siguiendo buenas practicas 
      //eager indica que la relacion se carga automaticamente al realizar consulta 
      eager: true,
    },
    //se define la realcion estado 
    estado: {
      //se define la cardinalidad N a 1
      type: "many-to-one",
      //se realaciona con la entidad Estado
      target: "Estado",
      //crea la columna de union con es Estado
      joinColumn: true,
      //se define que toda solicitud debe detener un estado 
      nullable: false,
      //la realcion se carga automaticamente
      eager: true,
    },
  },
});

//se exporta la entidad con valor por defecto 
export default SolicitudEntity;
*/

/*
"use strict";

//se importa la clase EntitySchema desde TypeORM
//esta clase permite definir entidades mediante objetos 
import { EntitySchema } from "typeorm";

//se exporta la constante SolicitudEntity que define la entidad Solicitud
//esto permite usar esta entidad en otros archivos del proyecto
export const SolicitudEntity = new EntitySchema({
  //se define la entidad Solicitud
  name: "Solicitud",
  //se define el nombre real de la tabla que se creará en la BD
  tableName: "solicitudes",

  //se definen las columnas de la tabla, cada clave es una columna distinta 
  columns: {
    //columna id con tipo Integer, clave primaria y auto-incremental
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    //columna para el nombre del estudiante, tipo VARCHAR y obligatorio
    nombre_estudiante: {
      type: String,
      nullable: false,
    },
    //columna para el correo del estudiante, tipo VARCHAR y obligatorio
    correo_estudiante: {
      type: String,
      nullable: false,
    },
    //columna para la carrera del estudiante, tipo VARCHAR y obligatorio
    carrera: {
      type: String,
      nullable: false,
    },
    //columna para la descripción del caso, tipo VARCHAR y obligatorio
    descripcion: {
      type: String,
      nullable: false,
    },
    //columna para almacenar el detalle de la resolución del caso
    //solo se completa cuando la solicitud es resuelta
    detalleResolucion: {
      type: String,
      nullable: false,
      default: "no existe aun",
    },
    // NUEVA COLUMNA para guardar la fecha en que la solicitud fue resuelta
    fecha_resolucion: {
      type: "timestamp",
      nullable: false, 
      default: () => "no existe aun",
    },
    //columna para guardar la fecha de creación de la solicitud
    //se asigna automáticamente al momento de crear el registro
    fecha_creacion: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    //columna para guardar la fecha de actualización
    //se actualiza automáticamente cada vez que se modifica el registro
    fecha_actualizacion: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: () => "CURRENT_TIMESTAMP",
    },
  },

  //se definen las relaciones con otras entidades
  relations: {
    //se define la realcion creador 
    creador: {
      //su cardinalidad es de N a 1
      type: "many-to-one",
      //se define que la entidad con la que se realciona es es User
      target: "User",
      //JoinColumna permite la creacion de la columna de la union en la BD
      joinColumn: true,
      //nullable indica que el campo es obligatorio 
      nullable: false,
      //eager carga automaticamente la realacion al realizar la consulta
      eager: true,
    },
    //se define la relacion gestor 
    gestor: {
      //su cardinalidad es de N a 1
      type: "many-to-one",
      //target define que la entidad con la que se relaciona es User
      target: "User",
      //joinColumn permite la creacion de la columna de union con el gestor
      joinColumn: true,
      //nullable false indica que este campo es obligatorio por lo tanto es no nulo
      nullable: false,//siguiendo buenas practicas 
      //eager indica que la relacion se carga automaticamente al realizar consulta 
      eager: true,
    },
    //se define la realcion estado 
    estado: {
      //se define la cardinalidad N a 1
      type: "many-to-one",
      //se realaciona con la entidad Estado
      target: "Estado",
      //crea la columna de union con es Estado
      joinColumn: true,
      //se define que toda solicitud debe detener un estado 
      nullable: false,
      //la realcion se carga automaticamente
      eager: true,
    },
  },
});

//se exporta la entidad con valor por defecto 
export default SolicitudEntity;
*/
/*
"use strict";

//se importa la clase EntitySchema desde TypeORM
import { EntitySchema } from "typeorm";

//se exporta la constante SolicitudEntity que define la entidad Solicitud
export const SolicitudEntity = new EntitySchema({
  name: "Solicitud",
  tableName: "solicitudes",

  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    nombre_estudiante: {
      type: String,
      nullable: false,
    },
    correo_estudiante: {
      type: String,
      nullable: false,
    },
    carrera: {
      type: String,
      nullable: false,
    },
    descripcion: {
      type: String,
      nullable: false,
    },
    detalleResolucion: {
      type: String,
      nullable: false,
      default: "no existe aun",
    },

    // ✅ CAMBIO: se reemplaza resueltaEn por fecha_resolucion
    fecha_resolucion: {
      type: "timestamp",
      nullable: false,
      default: () => "'2000-01-01T00:00:00'", // valor simbólico para indicar "no resuelto"
    },

    fecha_creacion: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    fecha_actualizacion: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: () => "CURRENT_TIMESTAMP",
    },
  },

  relations: {
    creador: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      nullable: false,
      eager: true,
    },
    gestor: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      nullable: false,
      eager: true,
    },
    estado: {
      type: "many-to-one",
      target: "Estado",
      joinColumn: true,
      nullable: false,
      eager: true,
    },
  },
});

export default SolicitudEntity;
*/

/*
"use strict";

import { EntitySchema } from "typeorm";

export const SolicitudEntity = new EntitySchema({
  name: "Solicitud",
  tableName: "solicitudes",

  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    nombre_estudiante: {
      type: String,
      nullable: false,
    },
    correo_estudiante: {
      type: String,
      nullable: false,
    },
    carrera: {
      type: String,
      nullable: false,
    },
    descripcion: {
      type: String,
      nullable: false,
    },
    detalleResolucion: {
      type: String,
      nullable: false,
      default: "no existe aun",
    },

    // 🔄 Cambiado: eliminamos valor por defecto y lo hacemos nullable
    fecha_resolucion: {
      type: "timestamp",
      nullable: true,
    },

    fecha_creacion: {
      type: "timestamp",
      createDate: true,//se usa para marcar de forma automatica la fecha de creacion
      //default: () => "CURRENT_TIMESTAMP",
    },
    fecha_actualizacion: {
      type: "timestamp",
      updateDate: true,//se actualiza automaticamente al modificar
      //default: () => "CURRENT_TIMESTAMP",
      //onUpdate: () => "CURRENT_TIMESTAMP",
    },
  },

  relations: {
    creador: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      nullable: false,
      eager: true,
    },
    gestor: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      nullable: false,
      eager: true,
    },
    estado: {
      type: "many-to-one",
      target: "Estado",
      joinColumn: true,
      nullable: false,
      eager: true,
    },
  },
});

export default SolicitudEntity;
*/

"use strict";

//se importa la clase EntitySchema desde TypeORM
//esta clase permite definir entidades mediante objetos 
import { EntitySchema } from "typeorm";

//se exporta la constante SolicitudEntity que define la entidad Solicitud
//esto permite usar esta entidad en otros archivos del proyecto
export const SolicitudEntity = new EntitySchema({
  //se define el nombre de la entidad que se usará internamente
  name: "Solicitud",
  //se define el nombre real de la tabla que se creará en la base de datos
  tableName: "solicitudes",

  //se definen las columnas de la tabla, cada clave representa una columna distinta
  columns: {
    //se define la columna id
    id: {
      //con tipo de dato Integer
      type: Number,
      //se indica que esta columna es la clave primaria
      primary: true,
      //se indica que el valor se genera automáticamente (auto-incremental)
      generated: true,
    },
    //se define la columna nombre_estudiante
    nombre_estudiante: {
      //tipo de dato String
      type: String,
      //no se permite que este campo quede vacío
      nullable: false,
    },
    //se define la columna correo_estudiante
    correo_estudiante: {
      type: String,
      nullable: false,
    },
    //se define la columna carrera
    carrera: {
      type: String,
      nullable: false,
    },
    //se define la columna descripcion (texto de la solicitud o queja)
    descripcion: {
      type: String,
      nullable: false,
    },
    //se define la columna detalleResolucion (respuesta que entrega el CEE)
    detalleResolucion: {
      type: String,
      //se establece que el valor por defecto será un texto indicando que aún no existe resolución
      default: "no existe aun",
      nullable: false,
    },
    //se define la columna fecha_resolucion
    fecha_resolucion: {
      //se especifica que el tipo es timestamp (fecha y hora)
      type: "timestamp",
      //se permite que este campo quede vacío
      nullable: true,
    },
    //se define la columna fecha_creacion
    fecha_creacion: {
      type: "timestamp",
      //se usa createDate para que se complete automáticamente con la fecha al crear
      createDate: true,
    },
    //se define la columna fecha_actualizacion
    fecha_actualizacion: {
      type: "timestamp",
      //se usa updateDate para que se actualice automáticamente cada vez que se modifica la solicitud
      updateDate: true,
    },
  },

  //se definen las relaciones con otras entidades
  relations: {
    //relación con la entidad User como creador de la solicitud
    creador: {
      //una solicitud pertenece a un usuario (muchas solicitudes - un usuario)
      type: "many-to-one",
      //se indica el nombre de la entidad con la que se relaciona
      target: "User",
      //se crea una columna con la clave foránea
      joinColumn: true,
      //el campo no puede ser nulo, debe haber un creador
      nullable: false,
      //la relación se carga automáticamente al consultar solicitudes
      eager: true,
    },
    //relación con la entidad User como gestor que tomará la solicitud
    gestor: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      nullable: false,
      eager: true,
    },
    //relación con la entidad Estado para indicar el estado actual de la solicitud
    estado: {
      type: "many-to-one",
      target: "Estado",
      joinColumn: true,
      nullable: false,
      eager: true,
    },
  },
});

//se exporta la entidad con valor por defecto para facilitar su importación
export default SolicitudEntity;
