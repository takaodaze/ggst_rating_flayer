import { DuelHistoryHtmlFetcher } from "./Fetcher/DuelHistoryHtmlFetcher";
import { DuelHistoryHtmlParser } from "./Parser/DuelHistoryHtmlParser";
import { PlayerPageFetcher } from "./Fetcher/PlayerPageFetcher";
import { PlayerPageParser } from "./Parser/PlayerPageParser";

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
