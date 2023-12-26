import * as cheerio from "cheerio";
import { z } from "zod";
import { DuelData } from "./type/DuelData";

export class DuelHistoryHtmlParser {
  constructor(private readonly html: string) {}

  parseFightingData(): z.infer<typeof DuelData>[] {
    const $ = cheerio.load(this.html);
    const historyDiv = $("#history").text();
    console.log(historyDiv);
    return [];
  }
}
