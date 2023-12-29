import { readFileSync } from "fs";
import { resolve } from "path";
import { PlayerPageParser } from "./PlayerPageParser";
import { PlayerName } from "../Schema/PlayerName";

const getTestHtml = () => {
  const path = resolve(__dirname, "../test/player-page.html");
  const testHtml = readFileSync(path, {
    encoding: "utf8",
  });
  return testHtml;
};

describe(PlayerPageParser.name, () => {
  const html = getTestHtml();
  const parser = new PlayerPageParser(html);

  it("parse test html", () => {
    const playerName = parser.parsePlayerName();
    const parsed = PlayerName.parse(playerName);
    expect(parsed).toEqual("博多ソル=バッドガイ");
  });
});
