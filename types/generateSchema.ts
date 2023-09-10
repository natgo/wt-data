import fs from "fs";
import { format } from "prettier";
import { ZodType } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

import { finalSchema } from "./final.schema";
import { modificationsSchema } from "./modifications.schema";
import { finalShopSchema } from "./shop.schema";
import { wikiSchema } from "./wiki.schema";

async function writeSchema<T>(schema: ZodType<T>, name: string) {
  fs.writeFileSync(
    `./types/${name}.schema.json`,
    await format(JSON.stringify(zodToJsonSchema(schema, name)), { parser: "json" }),
  );
}

writeSchema(finalSchema, "final");
writeSchema(modificationsSchema, "modifications");
writeSchema(finalShopSchema, "shop");
writeSchema(wikiSchema, "wiki");
