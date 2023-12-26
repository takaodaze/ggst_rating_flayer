import * as cheerio from "cheerio";
import { writeFileSync } from "fs";
import { HTMLFetcher } from "./HTMLFetcher";

const $ = cheerio.load('<h2 class="title">Hello world</h2>');

const result = $("h2.title").text();
console.log(result);

async function main(): Promise<void> {
  const url = "http://ratingupdate.info/player/2ECF2BA58568939/SO";
  const fetcher = new HTMLFetcher(url);
  const html = fetcher.fetchHtml();
}

main().catch((e) => {
  console.error(e);
});
