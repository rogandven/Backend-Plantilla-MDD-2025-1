import { EntitySchema, Timestamp } from "typeorm";

export const AsambleaEntity = new EntitySchema({
    name: "Asamblea",
    tableName: "asambleas",
    columns: {
        id: { type: Number, primary: true, generated: true },
        description: { type: String, nullable: false },
        date: { type: 'timestamp', nullable: false, default: () => "CURRENT_TIMESTAMP"},
        creatorId: {type: Number, nullable: false}
    },
    relations: {
        creator: {
            type: 'one-to-many',
            target: 'users',
            inverseSide: 'id',
            joinColumn: true
        },
    },    
});

export default AsambleaEntity;
