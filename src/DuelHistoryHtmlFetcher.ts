import { z } from "zod";
import { HistoryApiCharactorParam } from "./schema/HistoryApiCharactorParam";
import { PlayerId } from "./schema/PlayerId";

export class DuelHistoryHtmlFetcher {
  private readonly historyReqUrl: string;

  constructor(
    playerId: z.infer<typeof PlayerId>,
    charactor: z.infer<typeof HistoryApiCharactorParam>,
  ) {
    PlayerId.parse(playerId);
    HistoryApiCharactorParam.parse(charactor);

    this.historyReqUrl = `http://ratingupdate.info/player/${playerId}/${charactor}/history?offset=`;
  }

  async fetch() {
    const res = await fetch(this.historyReqUrl, {
      method: "GET",
    });

    const text = await res.text();
    return text;
  }
}
