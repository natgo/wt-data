import { z } from "zod";

// Wiki
export const topSpeed = z.number().array().length(2);
export type TopSpeed = z.infer<typeof topSpeed>;

export const visibility = z.number().max(3000);
export type Visibility = z.infer<typeof visibility>;

export const wikiSigleSchema = z.object({
  intname: z.string(),
  ab_top_speed: topSpeed,
  rb_top_speed: topSpeed,
  visibility: visibility,
});

export const wikiSchema = z.object({
  ground: z.array(wikiSigleSchema),
  aircraft: z.array(wikiSigleSchema),
  helicopter: z.array(wikiSigleSchema),
});
