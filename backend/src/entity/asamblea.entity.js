import { EntitySchema, Timestamp } from "typeorm";

export const AsambleaEntity = new EntitySchema({
    name: "Asamblea",
    tableName: "asambleas",
    columns: {
        id: { type: Number, primary: true, generated: true },
        description: { type: String, nullable: false },
        date: { type: 'timestamp', nullable: false, default: () => "CURRENT_TIMESTAMP"},
        creatorId: {type: Number, nullable: false},
        url: { type: String, nullable: true },
        place: { type: String, nullable: true },
    },
    relations: {
        creator: {
            type: 'many-to-one',
            target: 'users',
            inverseSide: 'creator',
            joinColumn: true
        },
    },         
});

export default AsambleaEntity;
