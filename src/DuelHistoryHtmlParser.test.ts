import { readFileSync } from "fs";
import { DuelHistoryHtmlParser } from "./DuelHistoryHtmlParser";
import { resolve } from "path";

const getTestHtml = () => {
  const path = resolve(__dirname, "./test/test.html");
  const testHtml = readFileSync(path, {
    encoding: "utf8",
  });
  return testHtml;
};

describe(DuelHistoryHtmlParser.name, () => {
  const html = getTestHtml();
  const parser = new DuelHistoryHtmlParser(html);

  it("parse test html", () => {
    parser.parseDuelData();
  });
});
