import * as cheerio from "cheerio";
import { writeFileSync } from "fs";

const $ = cheerio.load('<h2 class="title">Hello world</h2>');

const result = $("h2.title").text();
console.log(result);

async function f(): Promise<void> {
  const url = "http://ratingupdate.info/player/2ECF2BA58568939/SO";
  const res = await fetch(url, {
    method: "GET",
  });

  const text = await res.text();
  if (res.body == null) throw new Error("body is expected non undefined");

  writeFileSync("./test.html", text);
}

f().catch((e) => {
  console.error(e);
});
