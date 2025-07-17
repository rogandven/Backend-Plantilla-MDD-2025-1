"use strict";
import { EntitySchema } from "typeorm";

export const Meeting = new EntitySchema({
    name: "Meeting",
    tableName: "meetings",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        date: {
            type: "date",
            nullable: false,
        },
        time: {
            type: "varchar",
            nullable: false,
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
        createdBy: {
            type: "varchar",
            nullable: false,
        },
        description: {
            type: "varchar",
            length: 500,
            nullable: true,
        },
        status: {
            type: "varchar",
            default: "scheduled",
        }
    }
});
