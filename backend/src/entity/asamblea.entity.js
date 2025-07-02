import { EntitySchema, Timestamp } from "typeorm";

export const AsambleaEntity = new EntitySchema({
    name: "Asamblea",
    tableName: "asambleas",
    columns: {
        id: { type: Number, primary: true, generated: true },
        description: { type: String, nullable: false },
        date: { type: 'timestamp', nullable: false, default: () => "CURRENT_TIMESTAMP"}
    },
    relations: {
        creator: {
            type: 'one-to-one',
            target: 'users',
            inverseSide: 'id',
            joinColumn: true
        },
    },    
});

export default AsambleaEntity;
