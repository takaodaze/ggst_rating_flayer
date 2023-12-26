import * as cheerio from "cheerio";
import { FightingDataSchema, FightingDataType } from "./type/RatingData";

export class CharacterRatingPageParser {
  constructor(private readonly html: string) {}

  parseFightingData(): FightingDataType[] {
    const $ = cheerio.load(this.html);
    const historyDiv = $("#history").text();
    console.log(historyDiv);
    return [];
  }
}
