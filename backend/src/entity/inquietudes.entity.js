"use strict";

import { EntitySchema } from "typeorm";

export const reclamoEntity = new EntitySchema({
    name: "Reclamo",
    tableName: "reclamos",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        nombre_del_profesor: {
            type: String,
            nullable: false,
        },
        descripcion: {
            type: String,
            nullable: false,
        },
        ramo: {
            type: String,
            nullable: false,
        },

        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        updatedAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: () => "CURRENT_TIMESTAMP",
        },
    },
});

export default reclamoEntity;