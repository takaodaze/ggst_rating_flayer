import { z } from "zod";

export const NaturalNumberOrZero = z.number().int().min(0);
export const PositiveRealNumber = z.number().min(0);
export const RatingChangeDirection = z.union([z.literal("+"), z.literal("-")]);

export const DuelData = z.object({
  duelDate: z.date(),
  rating: NaturalNumberOrZero,
  ratingRange: NaturalNumberOrZero,
  ratingChangeDirection: RatingChangeDirection,
  ratingChange: PositiveRealNumber,
  floor: z.string().min(1),
  opponentPlayerName: z.string().min(1),
  opponentCharater: z.string().min(1),
  win: NaturalNumberOrZero,
  lose: NaturalNumberOrZero,
});
