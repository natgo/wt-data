import { z } from "zod";

import { vehiclRankSchema } from "./generic.schema";

//Final Shop

export const finalShopItemSchema = z.object({
  name: z.string(),
  rank: vehiclRankSchema,
  reqAir: z.union([z.literal(""), z.string()]).optional(),
  gift: z.boolean().optional(),
  hidden: z.boolean().optional(),
  marketplace: z.number().optional(),
  event: z.string().optional(),
  clanVehicle: z.boolean().optional(),
});
export type FinalShopItem = z.infer<typeof finalShopItemSchema>;

export const finalShopGroupSchema = z.object({
  name: z.string(),
  displayname: z.string(),
  image: z.string(),
  reqAir: z.union([z.literal(""), z.string()]).optional(),
  vehicles: z.array(finalShopItemSchema),
});
export type FinalShopGroup = z.infer<typeof finalShopGroupSchema>;

export const finalShopRangeSchema = z.object({
  col_normal: z.number(),
  min_rank: z.number(),
  max_rank: z.number(),
  needVehicles: z.array(z.number()).max(7),
  range: z.array(z.array(z.union([finalShopItemSchema, finalShopGroupSchema]))),
});
export type FinalShopRange = z.infer<typeof finalShopRangeSchema>;

export const finalRangeSchema = z.union([
  z.array(z.union([finalShopItemSchema, finalShopGroupSchema])),
  z.literal("drawArrow"),
]);
export type FinalRange = z.infer<typeof finalRangeSchema>;

export const finalRangeObjectSchema = z.array(finalRangeSchema);
export type FinalObjectRange = z.infer<typeof finalRangeObjectSchema>;

export const finalFinalShopRangeSchema = finalShopRangeSchema.extend({
  range: z.array(finalRangeObjectSchema),
});
export type FinalFinalShopRange = z.infer<typeof finalFinalShopRangeSchema>;

export const finalShopCountrySchema = z.object({
  army: finalFinalShopRangeSchema,
  helicopters: finalFinalShopRangeSchema,
  aviation: finalFinalShopRangeSchema,
  ship: finalFinalShopRangeSchema.optional(),
  boat: finalFinalShopRangeSchema.optional(),
});

export const finalShopSchema = z.record(finalShopCountrySchema);
export type FinalShop = z.infer<typeof finalShopSchema>;
