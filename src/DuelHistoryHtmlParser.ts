import * as cheerio from "cheerio";
import { z } from "zod";
import { DuelData } from "./schema/DuelData";

export class DuelHistoryHtmlParser {
  constructor(private readonly html: string) {}

  parseDuelData(): z.infer<typeof DuelData>[] {
    const $ = cheerio.load(this.html);
    const table = $("table");
    return [];
  }
}
