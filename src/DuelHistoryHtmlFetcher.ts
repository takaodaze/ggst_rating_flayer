import { z } from "zod";
import { HistoryApiCharactorParam } from "./type/HistoryApiCharactorParam";
import { PlayerId } from "./type/PlayerId";

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

  async fetchHistoryHtml() {
    const res = await fetch(this.historyReqUrl, {
      method: "GET",
    });

    const text = await res.text();
    console.log(text);
    console.log(res.headers);
    return text;
  }
}
