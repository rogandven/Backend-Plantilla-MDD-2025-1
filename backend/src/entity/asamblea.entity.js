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
            type: 'many-to-one',
            target: 'users',
            inverseSide: 'creator',
            joinColumn: true
        },
        place: {
            type: 'many-to-many',
            target: 'places',
            inverseSide: 'asamblea',
            joinTable: true
        },
        url: {
            type: 'many-to-many',
            target: 'urls',
            inverseSide: 'asamblea',
            joinTable: true
        }
    },         
});

export default AsambleaEntity;
