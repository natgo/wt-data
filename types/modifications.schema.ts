import { z } from "zod";

// Modifications

export const modClassName = z.enum([
  "lth",
  "armor",
  "weapon",
  "mobility",
  "protection",
  "firepower",
  "primaryWeapon",
  "secondaryWeapon",
  "premiumMods",
  "expendable",
  "seakeeping",
  "unsinkability",
]);
export type ModClassName = z.infer<typeof modClassName>;

export const baseModSchema = z.object({
  intname: z.string(),
  displayname: z.string().optional(),
  reqMod: z.string().optional(),
  image: z.string(),
});
export type BaseMod = z.infer<typeof baseModSchema>;

export const modClassSchema = z.object({
  lth: z.array(z.array(baseModSchema)).optional(),
  armor: z.array(z.array(baseModSchema)).optional(),
  weapon: z.array(z.array(baseModSchema)).optional(),
  mobility: z.array(z.array(baseModSchema)).optional(),
  protection: z.array(z.array(baseModSchema)).optional(),
  firepower: z.array(z.array(baseModSchema)).optional(),
  primaryWeapon: z.array(z.array(baseModSchema)).optional(),
  secondaryWeapon: z.array(z.array(baseModSchema)).optional(),
  premiumMods: z.array(z.array(baseModSchema)).optional(),
  expendable: z.array(z.array(baseModSchema)).optional(),
  seakeeping: z.array(z.array(baseModSchema)).optional(),
  unsinkability: z.array(z.array(baseModSchema)).optional(),
});
export type ModClass = z.infer<typeof modClassSchema>;

export const vehicleModsSchema = z.object({
  intname: z.string(),
  mods: modClassSchema,
});
export type VehicleMods = z.infer<typeof vehicleModsSchema>;

export const modificationsSchema = z.object({
  ground: z.array(z.union([vehicleModsSchema, z.undefined()])),
  aircraft: z.array(z.union([vehicleModsSchema, z.undefined()])),
  helicopter: z.array(z.union([vehicleModsSchema, z.undefined()])),
  ship: z.array(z.union([vehicleModsSchema, z.undefined()])),
  boat: z.array(z.union([vehicleModsSchema, z.undefined()])),
});
export type Modifications = z.infer<typeof modificationsSchema>;
