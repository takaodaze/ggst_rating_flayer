import { z } from "zod";
import { CharactorCode } from "./schema/CharactorCode";
import { PlayerId } from "./schema/PlayerId";

export class DuelHistoryHtmlFetcher {
  private readonly historyReqUrl: string;

  constructor(
    playerId: z.infer<typeof PlayerId>,
    charactor: z.infer<typeof CharactorCode>,
  ) {
    PlayerId.parse(playerId);
    CharactorCode.parse(charactor);

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
