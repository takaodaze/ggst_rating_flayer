import * as cheerio from "cheerio";
import { DuelDataType } from "./type/DuelData";

export class FightingHistoryParser {
  constructor(private readonly html: string) {}

  parseFightingData(): DuelDataType[] {
    const $ = cheerio.load(this.html);
    const historyDiv = $("#history").text();
    console.log(historyDiv);
    return [];
  }
}
