import { z } from "zod";
import { selectNewDuel } from "./selectNewDuel";
import { DuelData } from "./Schema/DuelData";

const prev: z.infer<typeof DuelData>[] = [
  {
    duelDate: new Date("2021/01/01 00:00:00"),
    opponentCharater: "SO",
    opponentPlayerName: "test",
    floor: "test",
    rating: 0,
    ratingChange: 0,
    ratingChangeDirection: "+",
    ratingRange: 0,
    win: 0,
    lose: 0,
  },
  {
    duelDate: new Date("2021/01/01 00:00:01"),
    opponentCharater: "SO",
    opponentPlayerName: "test",
    floor: "test",
    rating: 0,
    ratingChange: 0,
    ratingChangeDirection: "+",
    ratingRange: 0,
    win: 0,
    lose: 0,
  },
];

const curr: z.infer<typeof DuelData>[] = [
  {
    duelDate: new Date("2021/01/02 00:00:00"),
    opponentCharater: "SO",
    opponentPlayerName: "test",
    floor: "test",
    rating: 0,
    ratingChange: 0,
    ratingChangeDirection: "+",
    ratingRange: 0,
    win: 0,
    lose: 0,
  },
  {
    duelDate: new Date("2021/01/01 00:00:00"),
    opponentCharater: "SO",
    opponentPlayerName: "test",
    floor: "test",
    rating: 0,
    ratingChange: 0,
    ratingChangeDirection: "+",
    ratingRange: 0,
    win: 0,
    lose: 0,
  },
  {
    duelDate: new Date("2021/01/01 00:00:01"),
    opponentCharater: "SO",
    opponentPlayerName: "test",
    floor: "test",
    rating: 0,
    ratingChange: 0,
    ratingChangeDirection: "+",
    ratingRange: 0,
    win: 0,
    lose: 0,
  },
  {
    duelDate: new Date("2021/01/01 00:00:02"),
    opponentCharater: "SO",
    opponentPlayerName: "test",
    floor: "test",
    rating: 0,
    ratingChange: 0,
    ratingChangeDirection: "+",
    ratingRange: 0,
    win: 0,
    lose: 0,
  },
];

test(selectNewDuel.name, () => {
  const newDuels = selectNewDuel(curr, prev);
  expect(newDuels.length).toEqual(2);
  expect(newDuels[0].duelDate).toEqual(curr[0].duelDate);
  expect(newDuels[1].duelDate).toEqual(curr[3].duelDate);
});
