export class HTMLFetcher {
  constructor(private readonly url: string) {}
  async fetchHtml() {
    const res = await fetch(this.url, {
      method: "GET",
    });

    const text = await res.text();
    return text;
  }
}
