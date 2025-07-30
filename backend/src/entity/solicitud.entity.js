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
import { EntitySchema } from "typeorm";

//se exporta la constante SolicitudEntity que define la entidad Solicitud
export const SolicitudEntity = new EntitySchema({
  //se define el nombre lógico de la entidad
  name: "Solicitud",
  //se define el nombre real de la tabla que se creará en la base de datos
  tableName: "solicitudes",

  //se definen las columnas que tendrá la tabla solicitudes
  columns: {
    //se define la columna id como clave primaria y autoincremental
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    //se define la columna para guardar el nombre del estudiante
    nombre_estudiante: {
      type: String,
      nullable: false,
    },
    //se define la columna para guardar el correo del estudiante
    correo_estudiante: {
      type: String,
      nullable: false,
    },
    //se define la columna para guardar la carrera del estudiante
    carrera: {
      type: String,
      nullable: false,
    },
    //se define la columna para guardar la descripción del caso
    descripcion: {
      type: String,
      nullable: false,
    },
    //se define la columna para guardar el detalle de la resolución del caso
    detalleResolucion: {
      type: String,
      nullable: false,
      default: "no existe aun",
    },
    //se define la columna para registrar la fecha de resolución de la solicitud
    fecha_resolucion: {
      type: "timestamp",
      nullable: true,
    },
    //se define la columna que se llenará automáticamente al crear la solicitud
    fecha_creacion: {
      type: "timestamp",
      createDate: true,
    },
    //se define la columna que se actualizará automáticamente al modificar la solicitud
    fecha_actualizacion: {
      type: "timestamp",
      updateDate: true,
    },
  },

  //se definen las relaciones con otras entidades
  relations: {
    //se define la relación con el usuario que creó la solicitud
    creador: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      nullable: false,
      eager: true,
    },
    //se define la relación con el usuario que gestiona la solicitud
    gestor: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      nullable: false,
      eager: true,
    },
    //se define la relación con el estado actual de la solicitud
    estado: {
      type: "many-to-one",
      target: "Estado",
      joinColumn: true,
      nullable: false,
      eager: true,
    },
  },
});

//se exporta la entidad como valor por defecto
export default SolicitudEntity;

