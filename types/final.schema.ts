import { z } from "zod";

import { vehiclRankSchema } from "./generic.schema";

// Final

export type VehicleProps = GroundProps | AircraftProps | HelicopterProps | ShipProps | BoatProps;

export const obtainFromSchema = z.enum(["marketplace", "store", "gold", "gift"]).optional();
export type ObtainFrom = z.infer<typeof obtainFromSchema>;

export const normalAircraftTypeSchema = z.enum(["type_fighter", "type_bomber", "type_assault"]);
export const normalGroundTypeSchema = z.enum([
  "type_light_tank",
  "type_medium_tank",
  "type_heavy_tank",
  "type_tank_destroyer",
  "type_spaa",
]);
export const normalHelcopterTypeSchema = z.enum([
  "type_attack_helicopter",
  "type_utility_helicopter",
]);

export const countryname = z.enum([
  "country_usa",
  "country_germany",
  "country_ussr",
  "country_britain",
  "country_japan",
  "country_china",
  "country_italy",
  "country_france",
  "country_sweden",
  "country_israel",
]);
export type CountryName = z.infer<typeof countryname>;

export const finalPropsSchema = z.object({
  intname: z.string(),
  wikiname: z.string().optional(),
  displayname: z.string().optional(),
  country: countryname,
  operator_country: z.string().optional(),
  rank: vehiclRankSchema,
  crew: z.number(),
  sl_price: z.number(),
  reqRP: z.number().optional(),
  br: z.array(z.string()).length(3),
  realbr: z.array(z.number()).length(3),
  base_repair: z.array(z.number()).length(3),
  rp_multiplyer: z.number(),
  sl_multiplyer: z.array(z.number()).length(3),
  obtainFrom: obtainFromSchema,
  squad: z.boolean().optional(),
  event: z.string().optional(),
  cost_gold: z.number().optional(),
  hidden: z.boolean().optional(),
  marketplace: z.string().optional(),
  store: z.string().optional(),
});

export type FinalProps = z.infer<typeof finalPropsSchema>;

export const ballisticComputerSchema = z.object({
  ccip_guns: z.literal(true).optional(),
  ccip_rockets: z.literal(true).optional(),
  ccip_bombs: z.literal(true).optional(),
  ccrp_bombs: z.literal(true).optional(),
});
export type BallisticComputer = z.infer<typeof ballisticComputerSchema>;

export const weaponType = z
  .union([
    z.literal("aam"),
    z.literal("agm"),
    z.literal("bomb"),
    z.literal("guided_bomb"),
    z.literal("torpedo"),
    z.literal("rocket"),
    z.literal("gun"),
    z.literal("countermeasures"),
    z.literal("fuel_tank"),
    z.literal("optics"),
    z.literal("targeting_pod"),
    z.literal("booster"),
  ])
  .nullable();
export type WeaponType = z.infer<typeof weaponType>;

export const finalWeaponArraySchema = z.object({
  type: weaponType,
  displayname: z.string().optional(),
  bullets: z.number().optional(),
});
export type FinalWeaponArray = z.infer<typeof finalWeaponArraySchema>;

export const weaponSchema = z.object({
  type: weaponType,
  bullets: z.number().optional(),
  intname: z.string(),
  displayname: z.string().optional(),
  reqModification: z.union([z.string(), z.array(z.string())]).optional(),
});

export const finalWeaponSchema = weaponSchema.extend({
  iconType: z.string(),
});
export type FinalWeapon = z.infer<typeof finalWeaponSchema>;

export const weaponsSchema = z.object({
  intname: z.string(),
  reqModification: z.union([z.string(), z.array(z.string())]).optional(),
  weapons: z.array(finalWeaponArraySchema),
});

export const finalWeaponsSchema = weaponsSchema.extend({
  iconType: z.string(),
});
export type FinalWeapons = z.infer<typeof finalWeaponsSchema>;

export const finalWeaponSlot = z.union([
  z.object({
    hidden: z.boolean(),
    slot: z.array(
      z.union([
        weaponsSchema,
        weaponSchema,
        z.object({
          name: z.string(),
        }),
      ]),
    ),
  }),
  z.object({
    slot: z.array(
      z.union([
        finalWeaponsSchema,
        finalWeaponSchema,
        z.object({
          name: z.string(),
        }),
      ]),
    ),
  }),
]);
export type FinalWeaponSlot = z.infer<typeof finalWeaponSlot>;

export const secondaryWeaponPresetSchema = z.object({
  maxload: z.number(),
  maxloadLeft: z.number(),
  maxloadRight: z.number(),
  maxDisbalance: z.number(),
  weaponSlots: z.array(finalWeaponSlot),
});
export type SecondaryWeaponPreset = z.infer<typeof secondaryWeaponPresetSchema>;

export const aircraftTypeSchema = z.object({
  normal_type: z.enum(["type_fighter", "type_bomber", "type_assault", "type_strike_ucav"]),
  extended_type: z
    .array(
      z.enum([
        "type_jet_fighter",
        "type_jet_bomber",
        "type_longrange_bomber",
        "type_frontline_bomber",
        "type_hydroplane",
        "type_naval_aircraft",
        "type_torpedo_bomber",
        "type_dive_bomber",
        "type_interceptor",
        "type_aa_fighter",
        "type_light_bomber",
      ]),
    )
    .optional(),
});

export const aircraftPropsSchema = finalPropsSchema
  .extend({
    crew: z.number().optional(),
    type: z.literal("aviation"),
    ballistic_computer: ballisticComputerSchema.optional(),
    secondary_weapon_preset: secondaryWeaponPresetSchema.optional(),
  })
  .merge(aircraftTypeSchema);
export type AircraftProps = z.infer<typeof aircraftPropsSchema>;

export const opticIr = z.object({
  resolution: z.tuple([
    z.union([z.literal(800), z.literal(1200), z.literal(1600)]),
    z.union([z.literal(600), z.literal(800), z.literal(1200)]),
  ]),
  lightMult: z.number(),
  ghosting: z.number(),
  noiseFactor: z.number(),
});

export const sightSchema = z.object({
  ir: opticIr.optional(),
  thermal: z
    .object({
      resolution: z.tuple([
        z.union([z.literal(500), z.literal(800), z.literal(1200)]),
        z.union([z.literal(300), z.literal(600), z.literal(800)]),
      ]),
      noiseFactor: z.number(),
    })
    .optional(),
});
export type Sight = z.infer<typeof sightSchema>;

export const gunnerSightSchema = sightSchema.extend({
  zoomInFov: z.number(),
  zoomOutFov: z.number(),
});

export const sightsSchema = z.object({
  driver: sightSchema.optional(),
  gunner: gunnerSightSchema,
  commander: gunnerSightSchema.optional(),
});
export type Sights = z.infer<typeof sightsSchema>;

export const shellSchema = z.object({
  modname: z.string(),
  intname: z.string().optional(),
  type: z.string(),
  name: z.string().optional(),
  maxamount: z.number().optional(),
  modmaxamount: z.number().optional(),
});
export type Shell = z.infer<typeof shellSchema>;

export const beltSchema = z.object({
  intname: z.string(),
  type: z.string(),
  name: z.string().optional(),
});
export type Belt = z.infer<typeof beltSchema>;

export const hullAimingSchema = z.object({
  horizontal: z.boolean().optional(),
  vertical: z.boolean().optional(),
  maxRoll: z.number(),
});

export const stabilizerSchema = z.object({
  shoulderStop: z.boolean().optional(),
  horizontal: z.boolean().optional(),
  vertical: z.boolean().optional(),
  horizontalSpeed: z.number().optional(),
  verticalSpeed: z.number().optional(),
});
export type Stabilizer = z.infer<typeof stabilizerSchema>;

export const nightVisionSchema = z.object({
  commanderViewThermal: z
    .object({
      resolution: z.tuple([
        z.union([z.literal(500), z.literal(800), z.literal(1200)]),
        z.union([z.literal(300), z.literal(600), z.literal(800)]),
      ]),
      noiseFactor: z.union([z.literal(0.05), z.literal(0.04)]),
    })
    .optional(),
  gunnerThermal: z
    .object({
      resolution: z.tuple([
        z.union([z.literal(500), z.literal(800), z.literal(1200)]),
        z.union([z.literal(300), z.literal(600), z.literal(800)]),
      ]),
      noiseFactor: z.union([z.literal(0.05), z.literal(0.04)]),
    })
    .optional(),
  driverThermal: z
    .object({
      resolution: z.tuple([
        z.union([z.literal(500), z.literal(800), z.literal(1200)]),
        z.union([z.literal(300), z.literal(600), z.literal(800)]),
      ]),
      noiseFactor: z.union([z.literal(0.05), z.literal(0.04)]),
    })
    .optional(),
  commanderViewIr: z
    .object({
      resolution: z.tuple([
        z.union([z.literal(800), z.literal(1600)]),
        z.union([z.literal(600), z.literal(1200)]),
      ]),
      lightMult: z.union([z.literal(5), z.literal(8), z.literal(9)]),
      ghosting: z.union([z.literal(0.7), z.literal(0.75), z.literal(0.6)]),
      noiseFactor: z.literal(0.2),
    })
    .optional(),
  driverIr: z
    .object({
      resolution: z.tuple([
        z.union([z.literal(800), z.literal(1600)]),
        z.union([z.literal(600), z.literal(1200)]),
      ]),
      lightMult: z.union([z.literal(5), z.literal(8), z.literal(9)]),
      ghosting: z.union([z.literal(0.7), z.literal(0.75), z.literal(0.6)]),
      noiseFactor: z.literal(0.2),
    })
    .optional(),
  gunnerIr: z
    .object({
      resolution: z.tuple([
        z.union([z.literal(800), z.literal(1600)]),
        z.union([z.literal(600), z.literal(1200)]),
      ]),
      lightMult: z.union([z.literal(5), z.literal(8), z.literal(9)]),
      ghosting: z.union([z.literal(0.7), z.literal(0.75), z.literal(0.6)]),
      noiseFactor: z.literal(0.2),
    })
    .optional(),
});
export type NightVision = z.infer<typeof nightVisionSchema>;

export const shellBeltSchema = z.object({
  modname: z.string(),
  name: z.string(),
  maxamount: z.number().optional(),
  modmaxamount: z.number().optional(),
  shells: z.array(beltSchema),
});
export type ShellBelt = z.infer<typeof shellBeltSchema>;

export const baseWeaponSchema = z.object({
  horizonalSpeed: z.union([z.number(), z.literal("primary")]),
  verticalSpeed: z.union([z.number(), z.literal("primary")]),
  horizonalLimit: z.union([z.array(z.number()), z.literal("primary")]),
  verticalLimit: z.union([z.array(z.number()), z.literal("primary")]),
});

export const genericGunSchema = baseWeaponSchema.extend({
  intname: z.string(),
  displayname: z.string(),
  ammo: z.number(),
  shells: z.array(shellSchema).optional(),
  belts: z.array(shellBeltSchema).optional(),
  shotFreq: z.number(),
  reloadTime: z.number().optional(),
  caliber: z.number(),
});
export type GenericGun = z.infer<typeof genericGunSchema>;

// Flamethrower
export const flamethrower = baseWeaponSchema.extend({
  intname: z.string(),
  displayname: z.string(),
  flame: z.boolean(),
  ammo: z.number(),
  shells: z.array(shellSchema).optional(),
  belts: z.array(shellBeltSchema).optional(),
  shotFreq: z.number(),
  reloadTime: z.number().optional(),
});
export type Flamethrower = z.infer<typeof flamethrower>;

// Dummy weapon ie. optics in 9p157
export const dummyWeapon = baseWeaponSchema.extend({
  dummy: z.boolean(),
  stabilizer: stabilizerSchema.optional(),
});
export type DummyWeapon = z.infer<typeof dummyWeapon>;

// Normal cannon
export const cannonSchema = genericGunSchema.extend({
  secondary: z.boolean().optional(),
  autoloader: z.boolean().optional(),
  stabilizer: stabilizerSchema.optional(),
  hullAiming: hullAimingSchema.optional(),
});
export type Cannon = z.infer<typeof cannonSchema>;

export const tankCannonSchema = z.union([cannonSchema, dummyWeapon]);
export type TankCannon = z.infer<typeof tankCannonSchema>;

export const tankWeaponsSchema = z.object({
  cannon: z.array(tankCannonSchema).optional(),
  machineGun: z.array(z.union([genericGunSchema, flamethrower])).optional(),
});
export type TankWeapons = z.infer<typeof tankWeaponsSchema>;

export const groundTypeSchema = z.object({
  normal_type: z.enum([
    "type_light_tank",
    "type_medium_tank",
    "type_heavy_tank",
    "type_tank_destroyer",
    "type_spaa",
  ]),
  extended_type: z.array(z.enum(["type_missile_tank"])).optional(),
});

export const groundPropsSchema = finalPropsSchema
  .extend({
    type: z.literal("army"),
    mass: z.number(),
    horsepower: z.number(),
    gears_forward: z.number(),
    gears_backward: z.number(),
    maxSpeedRB: z.array(z.number()).length(2),
    maxSpeedAB: z.array(z.number()).length(2),
    hydro_suspension: z.boolean().optional(),
    can_float: z.boolean().optional(),
    has_synchro: z.boolean().optional(),
    has_neutral: z.boolean().optional(),
    has_dozer: z.boolean().optional(),
    has_ess: z.boolean().optional(),
    has_smoke: z.boolean().optional(),
    has_lws: z.boolean().optional(),
    has_era: z.boolean().optional(),
    has_composite: z.boolean().optional(),
    has_laser_range: z.boolean().optional(),
    has_range: z.boolean().optional(),
    optics: sightsSchema,
    weapons: tankWeaponsSchema.optional(),
  })
  .merge(groundTypeSchema);
export type GroundProps = z.infer<typeof groundPropsSchema>;

export const heliSightSchema = z.object({
  ir: z
    .object({
      resolution: z.array(z.number()),
      lightMult: z.number(),
      ghosting: z.number(),
      noiseFactor: z.number(),
    })
    .optional(),
});

export const heliGunnerSightSchema = heliSightSchema.extend({
  zoomInFov: z.number(),
  zoomOutFov: z.number(),
  thermal: z
    .object({
      resolution: z.tuple([
        z.union([z.literal(1920), z.literal(1024)]),
        z.union([z.literal(1080), z.literal(768)]),
      ]),
      noiseFactor: z.union([z.literal(0.5), z.literal(0.05)]),
    })
    .optional(),
});

export const helicopterOpticsSchema = z.object({
  pilot: heliSightSchema.optional(),
  gunner: heliSightSchema.optional(),
  sight: heliGunnerSightSchema.optional(),
});
export type HelicopterOptics = z.infer<typeof helicopterOpticsSchema>;

export const helicopterTypeSchema = z.object({
  normal_type: z.enum(["type_attack_helicopter", "type_utility_helicopter"]),
  extended_type: z.array(z.enum(["type_utility_helicopter"])).optional(),
});

export const helicopterPropsSchema = finalPropsSchema
  .extend({
    type: z.literal("helicopters"),
    ballistic_computer: ballisticComputerSchema.optional(),
    secondary_weapon_preset: secondaryWeaponPresetSchema.optional(),
    has_maw: z.boolean().optional(),
    has_lws: z.boolean().optional(),
    has_rwr: z.boolean().optional(),
    has_ircm: z.boolean().optional(),
    has_hirss: z.boolean().optional(),
    optics: helicopterOpticsSchema.optional(),
  })
  .merge(helicopterTypeSchema);
export type HelicopterProps = z.infer<typeof helicopterPropsSchema>;

export const shipTypeSchema = z.object({
  normal_type: z.enum([
    "type_battlecruiser",
    "type_battleship",
    "type_frigate",
    "type_light_cruiser",
    "type_heavy_cruiser",
    "type_destroyer",
  ]),
  extended_type: z.undefined(),
});

export const shipPropsSchema = finalPropsSchema
  .extend({
    type: z.literal("ship"),
  })
  .merge(shipTypeSchema);
export type ShipProps = z.infer<typeof shipPropsSchema>;

export const boatTypeSchema = z.object({
  normal_type: z.enum(["type_barge", "type_boat", "type_frigate"]),
  extended_type: z
    .array(
      z.enum([
        "type_heavy_boat",
        "type_armored_boat",
        "type_torpedo_boat",
        "type_gun_boat",
        "type_naval_ferry_barge",
        "type_naval_aa_ferry",
        "type_torpedo_gun_boat",
        "type_minelayer",
        "type_submarine_chaser",
        "type_frigate",
      ]),
    )
    .optional(),
});

export const boatPropsSchema = finalPropsSchema
  .extend({
    type: z.literal("boat"),
  })
  .merge(boatTypeSchema);
export type BoatProps = z.infer<typeof boatPropsSchema>;

export const vehicleTypesSchema = z.union([
  aircraftTypeSchema,
  groundTypeSchema,
  helicopterTypeSchema,
  shipTypeSchema,
  boatTypeSchema,
]);

export const finalSchema = z.object({
  version: z.string(),
  army: z.array(groundPropsSchema),
  aviation: z.array(aircraftPropsSchema),
  helicopters: z.array(helicopterPropsSchema),
  ship: z.array(shipPropsSchema),
  boat: z.array(boatPropsSchema),
});
export type Final = z.infer<typeof finalSchema>;
