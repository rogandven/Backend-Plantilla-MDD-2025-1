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
      nullable: false,
    },
    Monto: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    tipo: {
      type: "enum",
      enum: ["INGRESO", "EGRESO"],
      default: "INGRESO"
    },
    userId: {  // Añade explícitamente la columna
      type: Number,
      nullable: false
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