import { z } from "zod";

export const vehiclRankSchema = z.number().max(8).min(1);
export type VehicleRank = z.infer<typeof vehiclRankSchema>;
