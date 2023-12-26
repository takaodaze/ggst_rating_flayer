import { FightingDataSchema, FightingDataType } from "./type/RatingData";

export class CharacterRatingPageParser {
  constructor(private readonly html: string) {}

  parse(): FightingDataType[] {
    const data: FightingDataType = {
      fightedDate: new Date("2023-12-13 16:01"),
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
    };
    FightingDataSchema.parse(data);
    return [data];
  }
}
