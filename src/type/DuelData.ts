import { z } from "zod";

export const DuelData = z.object({
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
