import { z } from "zod";

export type _FightingData = {
  fightedDate: Date;
  rating: number;
  ratingRange: number;
  ratingChangeDirection: "positive" | "negative";
  ratingChange: number;
  floor: string;
  myselfPlayerName: string;
  myselfCharater: string;
  opponentPlayerName: string;
  opponentCharater: string;
  win: number;
  lose: number;
};

export const FightingDataSchema = z.object({
  fightedDate: z.date(),
  rating: z.number(),
  ratingRange: z.number(),
  ratingChangeDirection: z.union([
    z.literal("positive"),
    z.literal("negative"),
  ]),
  ratingChange: z.number(),
  floor: z.string(),
  myselfPlayerName: z.string(),
  myselfCharater: z.string(),
  opponentPlayerName: z.string(),
  opponentCharater: z.string(),
  win: z.number().gte(0),
  lose: z.number().gte(0),
});

export type FightingDataType = z.infer<typeof FightingDataSchema>;
