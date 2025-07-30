
"use strict";

//se importa la clase EntitySchema desde TypeORM
//esta clase permite definir entidades mediante objetos 
import { EntitySchema } from "typeorm";

//se exporta la constante UserEntity que define la entidad User
//esto permite usar esta entidad en otros archivos del proyecto
export const UserEntity = new EntitySchema({
  //se define la entidad User
  name: "User",
  //se define el nombre real de la tabla que se creará en la base de datos
  tableName: "users",
  //se definen las columnas de la tabla, cada clave representa un campo distinto
  columns: {
    //se define la columna id
    id: {
      //tipo de dato entero
      type: Number,
      //se indica que esta columna es la clave primaria
      primary: true,
      //se define el valor de id como auto-incremental
      generated: true,
    },
    //se define la columna username
    username: {
      //tipo de dato VARCHAR
      type: String,
      //se define que debe ser unico
      unique: true,
      //no se permite que quede vacío
      nullable: false,
    },
    //se define la columna rut
    rut: {
      //tipo de dato VARCHAR
      type: String,
      //el valor debe ser único
      unique: true,
      //el campo es obligatorio
      nullable: false,
    },
    //se define la columna email
    email: {
      //tipo de dato VARCHAR
      type: String,
      //el correo debe ser único
      unique: true,
      //no puede quedar vacío
      nullable: false,
    },
    //se define la columna password
    password: {
      //tipo de dato VARCHAR
      type: String,
      //el campo es obligatorio
      nullable: false,
    },
    //se define la columna role 
    role: {
      //tipo de dato VARCHAR
      type: String,
      //por defecto se asigna el valor "user" si no se especifica
      default: "user",
    },
    //se define la columna createdAt que indica fecha de creación
    createdAt: {
      //tipo de dato timestamp (fecha y hora)
      type: "timestamp",
      createDate: true,
      //valor por defecto: fecha y hora actual al momento de crear el registro
      //default: () => "CURRENT_TIMESTAMP",
    },
    //se define la columna updatedAt que indica fecha de actualización
    updatedAt: {
      //tipo de dato timestamp (fecha y hora)
      type: "timestamp",
      updateDate: true,
      //valor por defecto: fecha actual al crear el registro
      //default: () => "CURRENT_TIMESTAMP",
      //cada vez que se actualiza el registro, se cambia la fecha automáticamente
      //onUpdate: () => "CURRENT_TIMESTAMP",
    },
  },
});

//se exporta la entidad con valor por defecto
export default UserEntity;
