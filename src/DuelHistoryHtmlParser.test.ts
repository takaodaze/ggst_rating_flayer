import { readFileSync } from "fs";
import { DuelHistoryHtmlParser } from "./DuelHistoryHtmlParser";
import { resolve } from "path";
import { DuelData } from "./schema/DuelData";

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
  });
});
