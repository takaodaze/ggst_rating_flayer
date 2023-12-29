import { resolve } from "path";
import { FileSubscribeRepo } from "./FileSubscribeRepo";
import { writeFileSync } from "fs";
import { PlayerPageFetcher } from "./Fetcher/PlayerPageFetcher";
import { PlayerPageParser } from "./Parser/PlayerPageParser";
import { DuelHistoryHtmlFetcher } from "./Fetcher/DuelHistoryHtmlFetcher";
import { DuelHistoryHtmlParser } from "./Parser/DuelHistoryHtmlParser";
import { FileDuelHistoryRepository } from "./FileDuelHistoryRepo";

const subscribeStoreFilePath = resolve(__dirname, "../subscribe.json");
const duelHistoryStoreFIlePath = resolve(__dirname, "../duel_history.json");

const resetStore = () => {
  const initData = {
    subscribeList: [],
  };
  writeFileSync(subscribeStoreFilePath, JSON.stringify(initData));
};

export const init = async () => {
  const subscribeRepo = new FileSubscribeRepo(subscribeStoreFilePath);
  subscribeRepo.add({ character: "SO", playerId: "2ECF2BA58568939" });
  const hakataSol = subscribeRepo.getAll()[0];

  let playerPage, duelHistoryHtml: string;

  try {
    const playerPageFetcher = new PlayerPageFetcher(hakataSol.playerId);
    playerPage = await playerPageFetcher.fetch();
  } catch (e) {
    console.error("failed fetch player page");
    throw e;
  }

  try {
    const duelHistoryHtmlFetcher = new DuelHistoryHtmlFetcher(
      hakataSol.playerId,
      hakataSol.character,
    );
    duelHistoryHtml = await duelHistoryHtmlFetcher.fetch();
  } catch (e) {
    console.error("failed fetch duel history html");
    throw e;
  }

  const playerPageParser = new PlayerPageParser(playerPage);
  const playerName = playerPageParser.parsePlayerName();

  const duelHistoryHtmlParser = new DuelHistoryHtmlParser(duelHistoryHtml);
  const duelData = duelHistoryHtmlParser.parseDuelData();

  const duelHistoryRepo = new FileDuelHistoryRepository(
    duelHistoryStoreFIlePath,
  );
  duelHistoryRepo.replace(duelData);

  console.log(duelData);
  console.log(playerName);

  resetStore();
};

init().catch((e) => {
  console.error(e.message);
  console.error(Object.keys(e));
  console.error(e["cause"]);
  console.error(e.stack);
  return;
});
