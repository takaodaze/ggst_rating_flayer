import { z } from "zod";
import { DuelData } from "../schema/DuelData";

export const expectedData: z.infer<typeof DuelData>[] = [
  {
    duelDate: new Date("2023-12-13 16:01"),
    rating: 1102,
    ratingRange: 79,
    ratingChangeDirection: "positive",
    ratingChange: 4.1,
    floor: "F8",
    myselfCharater: "Sol",
    myselfPlayerName: "博多ソル=バッドガイ",
    opponentCharater: "Sol",
    opponentPlayerName: "BlacblueBlank",
    win: 4,
    lose: 1,
  },
];
