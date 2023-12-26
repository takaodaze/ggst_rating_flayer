import { HtmlFetcher } from "../HtmlFetcher";

describe.skip(HtmlFetcher.name, () => {
  const fetcher = new HtmlFetcher("2ECF2BA58568939", "SO");
  it("fetch rating history", async () => {
    fetcher.fetchHistoryHtml();
  });
});
