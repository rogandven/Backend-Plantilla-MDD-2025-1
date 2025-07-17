"use strict";


import { EntitySchema } from "typeorm";

export const OperacionesEntity = new EntitySchema({
  name: "Operaciones",
  tableName: "operaciones",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    nombre_actividad: {
      type: String,
      nullable: true,
    },
    monto: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },
    egreso: {
      type: Number,
      nullable: true,
    },
   ingreso: {
      type: Number,
      nullable: true,
    },
    tipo: {
      type: "enum",
      enum: ["INGRESO", "EGRESO"],
      default: "INGRESO"
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updatedAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: () => "CURRENT_TIMESTAMP",
    }
  },
  
});

export default OperacionesEntity;