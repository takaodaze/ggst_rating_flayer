export class HTMLFetcher {
  private readonly baseUrl: string =
    "http://ratingupdate.info/player/2ECF2BA58568939/SO/history?offset=";
  constructor(private readonly playerId: string) {}
  async fetchHtml() {
    const res = await fetch(this.url, {
      method: "GET",
    });

    console.log(res.headers);
    const text = await res.text();
    return text;
  }
}
