import { readFileSync } from "fs";
import { FightingHistoryParser } from "../HtmlParser";
import { resolve } from "path";

const getTestHtml = () => {
  const path = resolve(__dirname, "./HtmlParserTestData/test.html");
  const testHtml = readFileSync(path, {
    encoding: "utf8",
  });
  return testHtml;
};

describe(FightingHistoryParser.name, () => {
  const html = getTestHtml();
  const parser = new FightingHistoryParser(html);

  it("parse test html", () => {
    parser.parseFightingData();
    expect(() => {
      parser.parseFightingData();
    }).not.toThrow();
  });
});
