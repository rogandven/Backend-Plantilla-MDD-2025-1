import { EntitySchema } from "typeorm";

export const UrlEntity = new EntitySchema({
    name: "Url",
    tableName: "urls",
    columns: {
        id: { type: Number, primary: true, generated: true },
        link: { type: String, nullable: false },
    },
});

export default UrlEntity;