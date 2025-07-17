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
    resueltaEn: {
      type: "timestamp",
      nullable: true, // puede estar vacía si aún no se resuelve
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
