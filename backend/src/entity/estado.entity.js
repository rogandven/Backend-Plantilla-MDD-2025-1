
"use strict";

//se importa la clase EntitySchema desde TypeORM
//esta clase permite definir entidades mediante objetos 
import { EntitySchema } from "typeorm";

//se exporta la constante EstadoEntity que define la entidad Estado
//esto permite usar esta entidad en otros archivos del proyecto
export const EstadoEntity = new EntitySchema({
  //se define la entidad Estado 
  name: "Estado",
  //se define el nombre real de la tabla que se creara en la BD
  tableName: "estados",
  //se defienen las columnas de la tabla, cada clave es una columna distinta 
  columns: {
    //se define la columna id 
    id: {
      //con tipo de dato Integer
      type: Number,
      //se indica que la clave primaria es esta columna
      primary: true,
      //se indica que el valor del id es auto-incremental
      generated: true,
    },
    //se define la columna nombre
    nombre: {
      //se declara el tipo de dato VARCHAR
      type: String,
      //se define que no existan valores duplicados en la columna
      unique: true,
      //se define que no se permite que el campo quede vacio
      nullable: false,
    },
  },
});
//se exporta la entidad con valor por defecto 
export default EstadoEntity;

