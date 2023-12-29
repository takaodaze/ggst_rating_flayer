import { z } from "zod";
import { readFileSync } from "fs";
import { DuelHistoryHtmlParser } from "./DuelHistoryHtmlParser";
import { resolve } from "path";
import { DuelData } from "../Schema/DuelData";

export const expectedData: z.infer<typeof DuelData> = {
  duelDate: new Date("2023-12-13 16:01"),
  rating: 1102,
  ratingRange: 79,
  ratingChangeDirection: "+",
  ratingChange: 4.1,
  floor: "F8",
  opponentCharater: "Sol",
  opponentPlayerName: "BlacblueBlank",
  win: 4,
  lose: 1,
};

const getTestHtml = () => {
  const path = resolve(__dirname, "./test/duel-history-response.html");
  const testHtml = readFileSync(path, {
    encoding: "utf8",
  });
  return testHtml;
};

describe(DuelHistoryHtmlParser.name, () => {
  const html = getTestHtml();
  const parser = new DuelHistoryHtmlParser(html);

  it("parse test html", () => {
    const duelData = parser.parseDuelData();
    duelData.every((d) => DuelData.parse(d));

    expect(duelData).toHaveLength(28);

    expect(duelData[0].duelDate).toEqual(expectedData.duelDate);
    expect(duelData[0].floor).toEqual(expectedData.floor);
    expect(duelData[0].rating).toEqual(expectedData.rating);
    expect(duelData[0].ratingRange).toEqual(expectedData.ratingRange);
    expect(duelData[0].ratingChangeDirection).toEqual(
      expectedData.ratingChangeDirection,
    );
    expect(duelData[0].ratingChange).toEqual(expectedData.ratingChange);
    expect(duelData[0].opponentCharater).toEqual(expectedData.opponentCharater);
    expect(duelData[0].opponentPlayerName).toEqual(
      expectedData.opponentPlayerName,
    );
    expect(duelData[0].win).toEqual(expectedData.win);
    expect(duelData[0].lose).toEqual(expectedData.lose);
  });
});
