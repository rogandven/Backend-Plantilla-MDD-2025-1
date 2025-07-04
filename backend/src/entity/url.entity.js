import { EntitySchema } from "typeorm";

export const UrlEntity = new EntitySchema({
    name: "Url",
    tableName: "urls",
    columns: {
        id: { type: Number, primary: true, generated: true },
        link: { type: String, nullable: false },
    },
    relations: {
        asamblea: {
            type: 'many-to-many',
            target: 'asambleas',
            inverseSide: 'url',
            joinTable: true
        },
    },      
});

export default UrlEntity;