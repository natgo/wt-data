import { z } from "zod";

export const visibility = z.number().max(3000);
export type Visibility = z.infer<typeof visibility>;

export const wikiSigleSchema = z.object({
  intname: z.string(),
  visibility: visibility,
});
export type WikiSigle = z.infer<typeof wikiSigleSchema>;

export const wikiSchema = z.object({
  ground: z.array(wikiSigleSchema),
  aircraft: z.array(wikiSigleSchema),
  helicopter: z.array(wikiSigleSchema),
});
export type Wiki = z.infer<typeof wikiSchema>;
