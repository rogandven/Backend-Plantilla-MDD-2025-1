import { EntitySchema } from "typeorm";

export const PlaceEntity = new EntitySchema({
    name: "Place",
    tableName: "places",
    columns: {
        id: { type: Number, primary: true, generated: true },
        name: { type: String, nullable: false },
        address: { type: String, nullable: false },
    },
    relations: {
        asamblea: {
            type: 'many-to-many',
            target: 'asambleas',
            inverseSide: 'place',
            joinTable: true
        },
    },       
});

export default PlaceEntity;