import * as cheerio from "cheerio";

export class PlayerPageParser {
  private readonly $;
  constructor(private readonly html: string) {
    this.$ = cheerio.load(this.html);
  }

  parsePlayerName(): string {
    const firstTitle = this.$(".title:first");
    const innerSpan = firstTitle.find("span");
    innerSpan.text("");
    return firstTitle.text().trim();
  }
}
