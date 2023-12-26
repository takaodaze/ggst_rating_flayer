import { DuelHistoryHtmlFetcher } from "./DuelHistoryHtmlFetcher";
import { DuelHistoryHtmlParser } from "./DuelHistoryHtmlParser";
import { PlayerPageFetcher } from "./PlayerPageFetcher";
import { PlayerPageParser } from "./PlayerPageParser";

async function main(): Promise<void> {
  const myselfPlayerId = "2ECF2BA58568939";
  const myselfCharacter = "SO";

  const playerPageFetcher = new PlayerPageFetcher(myselfPlayerId);
  const playerPage = await playerPageFetcher.fetch();

  const playerPageParser = new PlayerPageParser(playerPage);
  const playerName = playerPageParser.parsePlayerName();

  const duelHistoryHtmlFetcher = new DuelHistoryHtmlFetcher(
    myselfPlayerId,
    myselfCharacter,
  );
  const duelHistoryHtml = await duelHistoryHtmlFetcher.fetch();
  const duelHistoryHtmlParser = new DuelHistoryHtmlParser(duelHistoryHtml);
  const duelData = duelHistoryHtmlParser.parseDuelData();

  console.log(duelData);
  console.log(playerName);
}

main().catch((e) => {
  console.error(e);
});
