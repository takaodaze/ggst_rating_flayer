import { resolve } from "path";
import { FileSubscribeRepo } from "./FileSubscribeRepo";
import { PlayerPageFetcher } from "./Fetcher/PlayerPageFetcher";
import { PlayerPageParser } from "./Parser/PlayerPageParser";
import { DuelHistoryHtmlFetcher } from "./Fetcher/DuelHistoryHtmlFetcher";
import { DuelHistoryHtmlParser } from "./Parser/DuelHistoryHtmlParser";
import { FileDuelHistoryRepository } from "./FileDuelHistoryRepo";
import { z } from "zod";
import { DuelData } from "./Schema/DuelData";
import { CharactorCode } from "./Schema/CharactorCode";
import { selectNewDuel } from "./selectNewDuel";
import { Client, Events, GatewayIntentBits } from "discord.js";

const subscribeStoreFilePath = resolve(__dirname, "../subscribe.json");
const duelHistoryStoreFIlePath = resolve(__dirname, "../duel_history.json");

export const GGST_CHANNEL = "1189317480628359278";

const fetchPlayerName = async (playerId: string) => {
  let playerPage;
  try {
    const playerPageFetcher = new PlayerPageFetcher(playerId);
    playerPage = await playerPageFetcher.fetch();
  } catch (e) {
    // TODO: リトライ処理
    console.error("failed fetch player page");
    throw e;
  }

  const playerPageParser = new PlayerPageParser(playerPage);
  let playerName: string;
  try {
    playerName = playerPageParser.parsePlayerName();
  } catch (e) {
    console.error("failed parse player page");
    throw e;
  }

  return playerName;
};

const currentDuelData = async (
  playerId: string,
  character: z.infer<typeof CharactorCode>,
): Promise<z.infer<typeof DuelData>[]> => {
  let duelHistoryHtml: string;

  try {
    const duelHistoryHtmlFetcher = new DuelHistoryHtmlFetcher(
      playerId,
      character,
    );
    duelHistoryHtml = await duelHistoryHtmlFetcher.fetch();
  } catch (e) {
    // TODO: リトライ処理
    console.error("failed fetch duel history html");
    throw e;
  }

  const duelHistoryHtmlParser = new DuelHistoryHtmlParser(duelHistoryHtml);
  let duelData: z.infer<typeof DuelData>[];
  try {
    duelData = duelHistoryHtmlParser.parseDuelData();
  } catch (e) {
    console.error("failed parse duel history html");
    throw e;
  }

  return duelData;
};

export const main = (arg: { initMode?: boolean }) => {
  const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

  discordClient.once(Events.ClientReady, async (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    const subscribeRepo = new FileSubscribeRepo(subscribeStoreFilePath);
    const firstSubscribe = subscribeRepo.getAll()[0];

    const playerName = await fetchPlayerName(firstSubscribe.playerId);
    console.log(`プレイヤー:${playerName} のデータを取得します`);

    const duelData = await currentDuelData(
      firstSubscribe.playerId,
      firstSubscribe.character,
    );

    const duelHistoryRepo = new FileDuelHistoryRepository(
      duelHistoryStoreFIlePath,
    );

    if (!arg.initMode) {
      const prevDuelData = duelHistoryRepo.getAll();
      const newDuelData = selectNewDuel(duelData, prevDuelData);
      console.log("new duel data size:", newDuelData.length);
      const channel = discordClient.channels.cache.get(GGST_CHANNEL);
      if (!channel) {
        throw new Error("channel not found");
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      channel.send("new duel data:" + JSON.stringify(newDuelData));
    }

    duelHistoryRepo.replace(duelData);

    discordClient.destroy();
  });

  discordClient.login("");
};

if (require.main === module) {
  main({ initMode: false });
}
