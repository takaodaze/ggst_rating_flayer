import { z } from "zod";
import { PlayerId } from "./Schema/PlayerId";

export class PlayerPageFetcher {
  private readonly historyReqUrl: string;

  constructor(playerId: z.infer<typeof PlayerId>) {
    PlayerId.parse(playerId);
    this.historyReqUrl = `http://ratingupdate.info/player/${playerId}/`;
  }

  async fetch() {
    const res = await fetch(this.historyReqUrl, {
      method: "GET",
    });

    const text = await res.text();
    return text;
  }
}
