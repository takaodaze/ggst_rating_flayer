import { HtmlFetcher } from "./HtmlFetcher";

async function main(): Promise<void> {
  const url = "http://ratingupdate.info/player/2ECF2BA58568939/SO";
  const fetcher = new HtmlFetcher(url);
  const html = fetcher.fetchHistoryHtml();

  const res = await fetch(
    "http://ratingupdate.info/player/2ECF2BA58568939/SO/history?offset=0",
  );

  console.log(res.status);
  console.log(await res.text());
}

main().catch((e) => {
  console.error(e);
});
