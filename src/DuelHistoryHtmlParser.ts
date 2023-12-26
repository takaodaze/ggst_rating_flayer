import * as cheerio from "cheerio";
import { z } from "zod";
import { DuelData, RatingChangeDirection } from "./schema/DuelData";

export class DuelHistoryHtmlParser {
  private readonly $;
  constructor(private readonly html: string) {
    this.$ = cheerio.load(this.html);
  }

  private parseHistoryMatrix(): string[][] {
    const trList = this.$("table tr");

    const matrix: string[][] = [];
    for (const tr of trList) {
      const thList = this.$(tr).find("td");
      const row: string[] = [];
      for (const td of thList) {
        const wrap = this.$(td);
        if (wrap.hasClass("opponent_column")) {
          wrap.find("span").text(""); // remove device tag of opponent name
        }
        const text = wrap.text().replace(/\s/g, "");
        row.push(text);
      }
      matrix.push(row);
    }

    // head is label
    matrix.shift();
    return matrix;
  }

  parseDuelData(): z.infer<typeof DuelData>[] {
    const matrix = this.parseHistoryMatrix();
    const duelData: z.infer<typeof DuelData>[] = matrix
      .map((row) => {
        const duelDate = row[0].slice(0, -5) + " " + row[0].slice(-5);
        const [rating, ratingRange] = row[1].split("±");
        const [win, lose] = row[7].split("-");
        const direction = row[8].slice(0, 1);
        const value = row[8].slice(1);
        return {
          duelDate: duelDate,
          rating: rating,
          ratingRange: ratingRange,
          floor: row[2],
          opponentPlayerName: row[3],
          opponentCharactorName: row[4],
          win: win,
          lose: lose,
          ratingChange: {
            direction: direction,
            value: value,
          },
        };
      })
      .map<z.infer<typeof DuelData>>((history) => ({
        duelDate: z.date().parse(new Date(history.duelDate)),
        rating: Number(history.rating),
        ratingRange: Number(history.ratingRange),
        ratingChangeDirection: RatingChangeDirection.parse(
          history.ratingChange.direction,
        ),
        ratingChange: Number(history.ratingChange.value),
        floor: history.floor,
        opponentCharater: history.opponentCharactorName,
        opponentPlayerName: history.opponentPlayerName,
        win: Number(history.win),
        lose: Number(history.lose),
      }))
      .map((history) => DuelData.parse(history));

    return duelData;
  }
}
