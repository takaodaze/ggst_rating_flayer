import { readFileSync } from "fs";
import { CharacterRatingPageParser } from "../HTMLParser";
import { resolve } from "path";

const getTestHtml = () => {
  const path = resolve(__dirname, "./ParserTestData/test.html");
  const testHtml = readFileSync(path, {
    encoding: "utf8",
  });
  return testHtml;
};

describe(CharacterRatingPageParser.name, () => {
  const html = getTestHtml();
  const parser = new CharacterRatingPageParser(html);

  it("parse test html", () => {
    expect(() => {
      parser.parse();
    }).not.toThrow();
  });
});
